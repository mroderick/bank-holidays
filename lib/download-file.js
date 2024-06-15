const fs = require("fs");
const { mkdir } = require("fs/promises");
const { Readable } = require("stream");
const { finished } = require("stream/promises");
const path = require("path");

async function downloadFile(url, folder, filename) {
  const res = await fetch(url);
  if (!fs.existsSync(folder)) {
    await mkdir(folder);
  }

  const destination = path.resolve(folder, filename);
  const fileStream = fs.createWriteStream(destination);
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
}

module.exports = downloadFile;
