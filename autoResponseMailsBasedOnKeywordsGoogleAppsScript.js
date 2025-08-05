function autoResponseMailsBasedOnKeywords() {
  // Search for unread threads in Gmail
  const threads = GmailApp.search('is:unread');
  // Define keywords to trigger auto-response (replace with your own)
  const keywordsSet1 = ['KEYWORD_1', 'KEYWORD_2'];
  const keywordsSet2 = ['KEYWORD_3', 'KEYWORD_4'];

  for (const thread of threads) {
    const messages = thread.getMessages();
    const lastMessage = messages[messages.length - 1];

    const subject = lastMessage.getSubject().toLowerCase();
    const body = lastMessage.getPlainBody().toLowerCase();

    // Check for keywords in subject or body
    let matchSet1 = keywordsSet1.some(word => subject.includes(word) || body.includes(word));
    let matchSet2 = keywordsSet2.some(word => subject.includes(word) || body.includes(word));

    // Check if the thread has already been processed
    const labelResponseSent = GmailApp.getUserLabelByName("AutoResponseSent") || GmailApp.createLabel("AutoResponseSent");
    if (thread.getLabels().some(label => label.getName() === "AutoResponseSent")) {
      continue; // Skip if already processed
    }

    // Only respond if the thread has a single message (no replies yet)
    if (messages.length === 1) {
      let responseText = null;

      if (matchSet1) {
        responseText = `PLACEHOLDER RESPONSE FOR KEYWORD SET 1`;
      } else if (matchSet2) {
        responseText = `PLACEHOLDER RESPONSE FOR KEYWORD SET 2`;
      }

      if (responseText) {
        GmailApp.sendEmail(
          lastMessage.getFrom(),
          "Re: " + subject,
          responseText,
          {
            name: "Support Team",
            replyTo: Session.getActiveUser().getEmail()
          }
        );
        thread.markRead();  // Mark thread as read

        // Add label to indicate auto-response was sent
        thread.addLabel(labelResponseSent);

        // Add label to indicate keyword was detected
        const labelKeywordDetected = GmailApp.getUserLabelByName("KeywordDetectedAutoResponse") || GmailApp.createLabel("KeywordDetectedAutoResponse");
        thread.addLabel(labelKeywordDetected);
      }
    }
  }
}
