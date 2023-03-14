const aws = require("aws-sdk");

const deleteFile = async (key) => {
  const spacesEndpoint = new aws.Endpoint(process.env.SPACE_ENDPOINT);
  const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: "surah-sound-file",
    Key: key,
  };

  console.log(key);

  try {
    await s3.deleteObject(params).promise();
    console.log("file deleted Successfully");
  } catch (err) {
    console.log("ERROR in file Deleting : " + JSON.stringify(err));
  }
};

module.exports = deleteFile;
