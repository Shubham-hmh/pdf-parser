const fs = require('fs');
const pdf = require('pdf-parse');

function parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);

  return pdf(dataBuffer).then(data => {
    return data.text;
  });
}

module.exports = {
  parsePDF,
};
