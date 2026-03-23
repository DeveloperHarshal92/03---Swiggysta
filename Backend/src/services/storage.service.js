const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

async function uploadFile(file, fileName) {
  const result = await imagekit.files.upload({
    file: file.toString("base64"),
    fileName: fileName,
    folder: "/food-videos"
  });

  return result;
}

module.exports = {
  uploadFile,
};
