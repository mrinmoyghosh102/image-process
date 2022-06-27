import "./App.css";

import FaceComponents from "./components/FaceComponents";
import { useEffect, useState } from "react";
import axios from "axios";
import Preview from "./components/Preview";
import Result from "./components/Result";

function App() {
  const [source, setSource] = useState({
    image: "",
  });

  const [status, setStatus] = useState(false);
  const [res, setRes] = useState("");
  const [imageStatus, setImageStatus] = useState(false);
  const [upload, setUpload] = useState({
    image: "",
  });

  function ValidateImage() {
    var image = document.getElementById("image").value;
    if (image !== "") {
      var checkimg = image.toLowerCase();
      // validation of file extension
      if (
        !checkimg.match(
          /(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG |\.webp|\.WEBP)$/
        )
      ) {
        document.getElementById("image").focus();
        alert("Wrong file selected");
        setImageStatus(false);
        return false;
      }
      setImageStatus(true);
      return true;
    }
  }

  const handleImageChange = (event) => {
    const urlImage = URL.createObjectURL(event.target.files[0]);
    setUpload({ ...upload, image: event.target.files[0] });
    setSource({ ...source, image: urlImage });
    ValidateImage();
  };

  const processUpload = async (imageUrl, imageFile) => {
    var myHead = new Headers();
    myHead.append("x-access-token", "1f9720f871674c18e5fecff61d92c1355cd4bfac25699fb7ddfe7717c9669b4d085193982402156122dfaa706885fd64741704649795c65b2a5bdec40347e28a");

    console.log('--------------------------------')
    console.log(imageFile)
    console.log(imageUrl)
    var formdata = new FormData();
    formdata.append("file", imageFile, imageUrl);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHead,
      redirect: 'follow'
    };

    await fetch("http://103.106.236.90:8080/", requestOptions)
      .then(response => response.text())
      .then(result => setRes(JSON.parse(result)))
      .catch(error => console.log('error:', error));
    
    // await axios({
    //   method: "POST",
    //   url: "http://103.106.236.90:8080/",
    //   data: formdata,
    //   headers: myHead,
    // })  
    // .then(function (response) {
    //   console.log("Success: ", response);
    // })
    // .catch(function (e) {
    //   console.log("Error: ", e);
    // })
  }
  useEffect(() => {
    if (imageStatus) {
      setStatus(true);
    }
  }, [upload.image, imageStatus]);

  const submitHandler = async (e) => {
    if (status) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");

      var formData = new FormData();
      formData.append("image", upload.image);
      try {
        await axios({
          method: "POST",
          url: "http://10.12.1.151:80/only_img_upload/",
          data: formData,
          headers: myHeaders,
        })
          .then(function (response) {
            console.log("Success: ", response.data);

            if (response.data.status === "success") {
              alert("File uploaded successfully");
              let imageUrl = response.data.image_url;
              let imageFile = upload.image;
              console.log('response: ', response)
              console.log('imageFile: ', imageFile)
              processUpload(imageUrl, imageFile);
              setImageStatus(false);
            } else {
              alert("Error Something went wrong!");

            }
          })
          .catch(function (e) {
            console.log("Error: ", e);
          });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      alert("Please select image to upload");
    }
  };

  return (
    <>
      <div className="header">
        <h1>Image Analytics For Crop Diseases Detection</h1>

        <div className="container">
          <div className="row align-items-center">
            <FaceComponents
              handleImageChange={handleImageChange}
              submitHandler={submitHandler}
            />
            <Preview source={source} />
          </div>
        </div>
      </div>
      <Result  res={res} />
    </>
  );
}

export default App;
