import nodemailer from "nodemailer";

import fs from "fs";

export const sendMail = async (req, res) => {
  try {
    fs.readFile("blogDetails.json", "utf8", function (err, blogTitles) {
      let recieverMail = req.body.email;

      var data = JSON.parse(blogTitles);
      var allTitles = data.map((x) => x.blogTitle);

      let uniqueTitles = [...new Set(allTitles)];

      //   console.log(uniqueTitles)

      let y = uniqueTitles.join(" ");

      console.log(y);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "codingblogs.learn@gmail.com",
          pass: "code@1234",
        },
      });

      let mailOptions = {
        from: "codingblogs.learn@gmail.com",
        to: recieverMail,

        subject: "Welcome to Coding Blogs!",
        html: `<span style="color:white;text-align: center; background-color : #4CAF50; font-size : 20px;
        border-radius: 1rem;  border: none; padding : 5px 14px ;margin: 10px 20px; display : inline-block" > New Blogs Published </span> 
        
        
        <div style="color:white;padding : 10px;font-size:20px; position: relative;
        top: 9px; background-color : #1d1d1d;border-radius: 1rem; display : flex; flex-wrap : wrap; align-items: stretch;justify-content: space-between;   margin: 6px 20px;" >${y} </div>
        
<button style = "width: 100px;
border-radius: 1rem;
height: 30px;
font-size: 16px;
background: #070543f0;
border: none;
color: #ffe3e3;
margin: 7px 20px; " role="button">Read More</button>`,
      };

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return console.log(err);
        }
        return console.log("Email sent!!!");
      });
    });

    return res.send(
     `Subscription successfull. 
      Welcome to CodingBlogs.com, you can now recieve your favourite blogs in your inbox.`
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};
