import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  console.log(file);

  let handleImageSend = async () => {
    let formData = new FormData();
    formData.append("image", file);

    let res = await axios.post(
      "http://localhost:3000/api/post/create",
      formData,
    );

    console.log(res.data);
    setData(res.data);
  };

  return (
    <div>
      <h1>Multer integration</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleImageSend}>Send</button> <br />
      <img
        width={200}
        src="https://ik.imagekit.io/asdfghjklqwertyuiop/1a3af113250882059a347ef755121172-removebg-preview_gVTIXO33i.png"
        alt="img"
      />
    </div>
  );
};

export default App;
