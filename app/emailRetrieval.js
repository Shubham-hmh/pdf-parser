const { google } = require('googleapis');
const fs = require('fs');

const credentials = require('../credentials.json'); 

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  SCOPES
);

const gmail = google.gmail({ version: 'v1', auth });

async function getEmails() {
  const response = await gmail.users.messages.list({
    userId: 'me',
    q: 'subject:YourSpecificSubject',
  });

  const messages = response.data.messages;
  messages.forEach(async message => {
    const messageId = message.id;
    const messageData = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
    });

    const attachments = messageData.data.payload.parts.filter(
      part => part.filename
    );

    attachments.forEach(async attachment => {
      const attachmentId = attachment.body.attachmentId;
      const attachmentData = await gmail.users.messages.attachments.get({
        userId: 'me',
        messageId: messageId,
        id: attachmentId,
      });

      const data = attachmentData.data.data;
      const fileData = Buffer.from(data, 'base64');

      fs.writeFileSync('attachment.pdf', fileData);
      // Now you can parse the PDF
    });
  });
}

module.exports = {
  getEmails,
};
