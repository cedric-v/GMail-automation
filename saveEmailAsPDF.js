// To be scheduled to run every 12 hours
// Converts the email to PDF and stores it on Google Drive
// If the email contains a PDF attachment, stores it on Google Drive
// Adds all PDF attachments to the same folder
// Replaces the Gmail label after processing and archives the message

function saveEmailAsPDF() {
  var labelSource = "Comptabilite/FWDGDrivejustificatifsGoogleApsScript";  // Label to monitor
  var labelProcessed = "Comptabilite/FWDGDrivejustificatifsGoogleApsScriptProcessed";  // New label after processing
  var folderId = "YOUR_FOLDER_ID_HERE"; // Target folder on Google Drive, see URL

  var threads = GmailApp.search("label:" + labelSource);
  var folder = DriveApp.getFolderById(folderId);

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var subject = message.getSubject().replace(/[^a-zA-Z0-9]/g, "_");
      var date = message.getDate().toISOString().split("T")[0];
      var baseFileName = date + "_" + subject;
      
      var hasPDFAttachment = false;
      var attachments = message.getAttachments();

      // Check if a PDF attachment is present
      for (var k = 0; k < attachments.length; k++) {
        var attachment = attachments[k];
        if (attachment.getContentType() === "application/pdf") {
          folder.createFile(attachment); // Store the PDF attachment
          hasPDFAttachment = true;
        }
      }

      // If no PDF attachment, generate a PDF from the email body
      if (!hasPDFAttachment) {
        var htmlBody = message.getBody();
        var blob = Utilities.newBlob(htmlBody, "text/html", baseFileName + ".pdf");
        var pdf = blob.getAs("application/pdf");
        folder.createFile(pdf);
      }
    }

    // Add the "processed" label
    var processedLabel = GmailApp.getUserLabelByName(labelProcessed);
    if (!processedLabel) {
      processedLabel = GmailApp.createLabel(labelProcessed);
    }
    threads[i].addLabel(processedLabel);

    // Remove the source label and archive the email
    var sourceLabel = GmailApp.getUserLabelByName(labelSource);
    if (sourceLabel) {
      threads[i].removeLabel(sourceLabel);
    }
    threads[i].moveToArchive(); // Remove from inbox
  }
}
