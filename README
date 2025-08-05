# Automated Email Response & Save Email as PDF

This repository contains two Google Apps Script files:

- [`autoResponseMailsBasedOnKeywordsGoogleAppsScript.js`](autoResponseMailsBasedOnKeywordsGoogleAppsScript.js): Automatically replies to unread Gmail messages based on detected keywords (placeholders provided) and applies labels.
- [`saveEmailAsPDF.js`](saveEmailAsPDF.js): Saves emails and PDF attachments from Gmail to Google Drive, applies labels, and archives processed emails.

## Setup & Usage

1. **Copy scripts to the Google Apps Script editor** attached to your Gmail account.
2. **Configure labels and folder IDs** as needed:
   - Update `labelSource`, `labelProcessed`, and `folderId` in [`saveEmailAsPDF.js`](saveEmailAsPDF.js).
   - Update `keywordsSet1`, `keywordsSet2`, and response placeholders in [`autoResponseMailsBasedOnKeywordsGoogleAppsScript.js`](autoResponseMailsBasedOnKeywordsGoogleAppsScript.js).
   - Ensure labels used in both scripts exist or are created by the script.
3. **Set up time-based triggers** in Apps Script:
   - For the automatic keyword-based reply script, configure a time-driven trigger to run every minute for near real-time responses.
   - For the email-to-PDF script, set the trigger to run every 12 hours or as needed.
4. **Review and adapt reply templates and keywords** for your organization.

## Permissions

These scripts require access to Gmail and Google Drive. When deploying, review and accept the necessary permissions.

## Security Notice

- Do not publish personal credentials or sensitive information.
- Review reply templates and keywords before publishing.

## License

BSD 3-Clause "New" or "Revised" License

Copyright (c) 2025, Cédric Vonlanthen  
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
