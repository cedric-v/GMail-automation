// A configurer pour être exécuté toutes les 12 heures
// Convertit l'email en PDF et le stocke sur Google Drive
// Si l'e-mail contient un PDF, le stock sur GDrive
// Ajoute toutes les pièces jointes PDF dans le même dossier
// Remplace le libellé Gmail après traitement + archive le message

function saveEmailAsPDF() {
  var labelSource = "Comptabilite/FWDGDrivejustificatifsGoogleApsScript";  // Label à surveiller
  var labelProcessed = "Comptabilite/FWDGDrivejustificatifsGoogleApsScriptProcessed";  // Nouveau label après traitement
  var folderId = "YOUR_FOLDER_ID_HERE"; // Dossier cible sur Google Drive, cf. URL

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

      // Vérifier si une pièce jointe PDF est présente
      for (var k = 0; k < attachments.length; k++) {
        var attachment = attachments[k];
        if (attachment.getContentType() === "application/pdf") {
          folder.createFile(attachment); // Stocker la pièce jointe PDF
          hasPDFAttachment = true;
        }
      }

      // Si aucune pièce jointe PDF, générer un PDF à partir du mail
      if (!hasPDFAttachment) {
        var htmlBody = message.getBody();
        var blob = Utilities.newBlob(htmlBody, "text/html", baseFileName + ".pdf");
        var pdf = blob.getAs("application/pdf");
        folder.createFile(pdf);
      }
    }

    // Ajouter le label "traité"
    var processedLabel = GmailApp.getUserLabelByName(labelProcessed);
    if (!processedLabel) {
      processedLabel = GmailApp.createLabel(labelProcessed);
    }
    threads[i].addLabel(processedLabel);

    // Supprimer le label source et archiver l'email
    var sourceLabel = GmailApp.getUserLabelByName(labelSource);
    if (sourceLabel) {
      threads[i].removeLabel(sourceLabel);
    }
    threads[i].moveToArchive(); // Ne plus l’avoir en boîte de réception
  }
}
