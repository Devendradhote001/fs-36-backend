const express = require("express");

const app = express();

app.use(express.json());

// crud

let arr = [];



app.post("/create-profile", (req, res) => {
  console.log(req.body);
  let { name, mobile, batchId } = req.body;

  let studentObj = {
    studentName: name,
    studentContact: mobile,
    batchCode: batchId,
  };

  arr.push(studentObj);
  res.json({
    message: "Student registered",
    data: arr,
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
