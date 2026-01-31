import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Schema definition
const LeadSchema = z.object({
    name: z.string().trim().min(2).max(120),
    firm: z.string().trim().min(2).max(180),
    email: z.string().trim().email().max(180),
    phone: z.string().trim().min(7).max(40),
    partnerType: z.enum(["ca", "cs", "consultant", "advisor", "other"]),
    message: z.string().trim().min(20).max(2000),
    website: z.string().trim().max(200).optional().default(""), // honeypot
});

// Helper functions (formerly in server.js)
function getIp(req) {
    return req.headers['x-forwarded-for'] || req.socket?.remoteAddress || "unknown";
}

function safeId() {
    return crypto.randomBytes(10).toString("hex");
}

function createTransport() {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.LEAD_TO_EMAIL;
    // If env vars are missing, return null (logs provided below)
    if (!host || !user || !pass || !to) return null;

    return nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || "false") === "true",
        auth: { user, pass },
    });
}

// Google Sheet Webhook Sync
async function saveToGoogleSheet(data) {
    const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!GOOGLE_SHEET_WEBHOOK_URL) {
        console.warn("[sheets] GOOGLE_SHEET_WEBHOOK_URL not configured");
        return;
    }

    try {
        const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        const result = await response.json();
        console.log("[sheets] saved successfully", result);
    } catch (err) {
        console.error("[sheets] save_failed", err.message);
        throw err;
    }
}

export default async function handler(req, res) {
    // 1. Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // 2. Parse & Validate
    const parsed = LeadSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid submission." });
    }
    const lead = parsed.data;

    // 3. Honeypot Check
    if (lead.website && lead.website.length > 0) {
        return res.status(200).json({ ok: true });
    }

    // 4. Prepare Data
    const submissionId = safeId();
    const ip = getIp(req);
    const ua = String(req.headers["user-agent"] || "");
    const ts = new Date().toISOString();

    const sheetData = {
        submissionId,
        timestamp: ts,
        name: lead.name,
        firm: lead.firm,
        email: lead.email,
        phone: lead.phone,
        partnerType: lead.partnerType,
        message: lead.message,
    };

    // 5. Save to Google Sheets (Async - careful in Serverless)
    // In Vercel functions (lambda), we should await async work or it might be frozen.
    try {
        await saveToGoogleSheet(sheetData);
        console.log("[lead] saved to Google Sheet", submissionId);
    } catch (err) {
        console.error("[lead] sheets_failed", submissionId, err.message);
        // We don't fail the request if sheets fail, just log it.
    }

    // 6. Send Email
    const transport = createTransport();
    if (!transport) {
        console.warn("[lead] SMTP not configured, skipping email.");
        // Return success since we likely saved to sheets or just want to ack
        return res.status(200).json({ ok: true, message: "Received." });
    }

    const from = process.env.LEAD_FROM_EMAIL || "no-reply@sme-ipo-partners.local";
    const to = process.env.LEAD_TO_EMAIL;
    const subject = `New Partner Lead — ${lead.name} (${lead.partnerType.toUpperCase()})`;
    const text = [
        `Submission ID: ${submissionId}`,
        `Timestamp: ${ts}`,
        `IP: ${ip}`,
        `User-Agent: ${ua}`,
        "",
        `Name: ${lead.name}`,
        `Firm: ${lead.firm}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone}`,
        `Partner Type: ${lead.partnerType}`,
        "",
        "Message:",
        lead.message,
    ].join("\n");

    try {
        await transport.sendMail({ from, to, subject, text });
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("[lead] email_failed", submissionId, err);
        return res.status(200).json({ ok: true, message: "Saved. Email notification failed." });
    }
}
