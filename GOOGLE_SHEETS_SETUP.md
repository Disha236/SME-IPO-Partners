# How to Connect Your Contact Form to Google Sheets

Since we are not using a traditional database, we can use a free Google Sheet to store all your leads. This is zero-maintenance and instant.

### Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank sheet.
2. Name it `SME IPO Partner Leads` (or any name you prefer).
3. In the first row, add these headers:
   - **Column A**: Date
   - **Column B**: Submission ID
   - **Column C**: Name
   - **Column D**: Firm
   - **Column E**: Email
   - **Column F**: Phone
   - **Column G**: Partner Type
   - **Column H**: Message

### Step 2: Add the Apps Script
1. In your new Google Sheet, click `Extensions` > `Apps Script`.
2. Delete any code in the editor and paste the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.submissionId || '',
    data.name || '',
    data.firm || '',
    data.email || '',
    "'" + (data.phone || ''), // Prepend ' to prevent formula errors with + country codes
    data.partnerType || '',
    data.message || ''
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
}
```

3. Press `Ctrl + S` (or Cmd + S) to save. Name the project "LeadWebhook" (or any name you prefer).

### Step 3: Deploy the Web App
1. Click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Settings:
   - **Description**: Contact Form Webhook
   - **Execute as**: Me (your email)
   - **Who has access**: **Anyone** (This is critical so your website can send data)
4. Click **Deploy**.
5. You might be asked to "Authorize access". Click "Review permissions", select your account, then click "Advanced" > "Go to LeadWebhook (unsafe)" (it is safe, it's your own script).
6. Copy the **Web App URL** (it ends with `/exec`).

### Step 4: Connect to Your Website
1. Create a file named `.env` in the root of your project (if you don't have one).
2. Copy `.env.example` to `.env` if needed.
3. Add the following line to your `.env` file:

```env
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_COPIED_ID/exec
```

Replace `YOUR_COPIED_ID` with the actual Web App URL you copied in Step 3.

4. Restart your development server (`npm run dev`).

✅ **Done!** Every time someone fills out the contact form, a new row will instantly appear in your Google Sheet.

## Troubleshooting

### No data appearing in the sheet
- Check that the Web App URL in `.env` is correct (ends with `/exec`)
- Verify that "Who has access" is set to **Anyone** in the Apps Script deployment
- Check your server logs for any error messages
- Make sure you restarted the server after adding the `.env` variable

### Error: "Script function not found"
- Make sure the function is named exactly `doPost` (case-sensitive)
- Verify you saved the Apps Script project

### Error: "Access denied" or "Permission denied"
- In Apps Script deployment, ensure "Who has access" is set to **Anyone**
- Re-deploy the web app if you changed the access settings

### Phone numbers showing as formulas
- The script already prepends `'` to phone numbers to prevent this
- If you see issues, check that the phone field in the script has `"'" +` before the data

## Security Notes

- The webhook URL is public, but it only accepts POST requests with valid form data
- Your server validates all form submissions before sending to Google Sheets
- The Apps Script only appends rows - it cannot read or modify existing data without your permission
- Keep your `.env` file secure and never commit it to git
