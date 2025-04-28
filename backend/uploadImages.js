const fs = require("fs");
const mongoose = require("mongoose");
const Image = require("./models/Image");
const { detectFaceEncoding } = require("./utils/deepstack");

mongoose.connect("mongodb://localhost:27017/face_recognition");

const uploadImages = async () => {
  const files = fs.readdirSync("./uploads");
  for (let file of files) {
    const base64 = fs.readFileSync(`./uploads/${file}`, { encoding: "base64" });
    const encoding = await detectFaceEncoding(
      `data:image/${file.split(".").pop()};base64,${base64}`
    );

    if (encoding) {
      await Image.create({
        imageUrl: `uploads/${file}`,
        faceEncoding: encoding,
      });
      console.log(`Uploaded ${file}`);
    }
  }
  mongoose.disconnect();
};

uploadImages();

// const request = require("request");
// const fs = require("fs");

// run_prediction("./Tushar.jpg","Tushar");

// function run_prediction(image_path,userid){

//     image_stream = fs.createReadStream(image_path)

//     var form = {"image":image_stream,"userid":userid}

//     request.post({url:"http://localhost:80/v1/vision/face/register", formData:form},function(err,res,body){

//         response = JSON.parse(body)
//         console.log(res)

//     })
// }
