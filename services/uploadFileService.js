const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

// const imageStorage = multer.diskStorage({
//   destination: "images", // Destination to store image
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       DecodeToken(req.headers.authorization).uid +
//         "_" +
//         Date.now() +
//         path.extname(file.originalname)
//     );
//     // file.fieldname is name of the field (image), path.extname get the uploaded file extension
//   },
// });

// const imageUploadDep = multer({
//   storage: imageStorage,
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg|jfif)$/)) {
//       // upload only png and jpg format
//       return cb(new Error("Please upload a Image"));
//     }
//     cb(undefined, true);
//   },
// });

//"fra1.digitaloceanspaces.com"
const spacesEndpoint = new aws.Endpoint(process.env.SPACE_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
// fra1.digitaloceanspaces.com

// DL9XmQaEcOAqvh23vy6nUj379ct3+8+K31YhztymbzI pri

// DO002RRQ4TGZYB7XBVBU pub

const surahUploadMulter = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp3|wav|m4a)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a file with formats: mp3 wav m4a"));
    }
    cb(undefined, true);
  },
  storage: multerS3({
    s3: s3,
    bucket: "surah-sound-file",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log(req);
      cb(null, Date.now() + path.extname(file.originalname));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
      // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    },
  }),
});

module.exports = surahUploadMulter;
