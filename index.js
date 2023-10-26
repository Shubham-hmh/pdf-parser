const api = require('./app/api');
const express =require('express');
const app =express();
const { getEmails } = require('./app/emailRetrieval');
const { parsePDF } = require('./app/pdfParser');

// Start the Express app
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Fetch emails and parse PDFs
getEmails().then(() => {
  parsePDF('attachment.pdf').then(text => {
    console.log(text);
  });
});


 
