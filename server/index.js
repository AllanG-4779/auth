// @ts-nocheck
const express = require("express");
const jwt = require("jsonwebtoken");

const { database } = require("./database");
const bcrypt = require("bcrypt");
const { response } = require("express");
const cors = require("cors");
//for auth
const cookie = require("cookie-parser")
require("dotenv").config()



const app = express();
app.use(express.json());
const users = [];
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["PUT", "GET", "POST"],
  })
);
// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","*")
//   res.header("Access-Control-Allow-Headers","*")
//   next()
// })

app.use(cookie());

app.post("/login/:id/:password", (req, res) => {
  const query_to_login =
    "SELECT * FROM authentication WHERE email = ? or phone = ?";
  let current_user = [];
  database.query(
    query_to_login,
    [req.params.id, req.params.id],
    (error, result) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ Message: "Error when retrieving the supplied data" });
      } else if (result) {
        current_user = result;
        if (current_user.length > 0) {
          bcrypt.compare(
            req.params.password,
            current_user[0].Password,
            (wrong, correct) => {
              if (wrong) {
                console.log(wrong);
                res.status(403).json({ Message: "Server Error" });
              } else if (correct) {
                let currentUser = current_user[0];
                jwt.sign({ user: currentUser }, "signIn",{expiresIn:"30s"}, (err, token) => {
                  res.status(201).json({ token: token });
                });
              } else {
                res
                  .status(403)
                  .json({ Message: "Wrong username or Password " });
              }
            }
          );
        } else {
          res.status(404).json({
            Message: "No such user! Would you mind signing up instead",
          });
        }
      }
    }
  );
});

app.post("/register", async (req, res) => {
  const query = `INSERT INTO authentication(first_name, last_name, dob, email, phone, Password) values (?,?,?,?,?,?)`;
  const body = req.body;

  let email = false;
  let phone = false;
  console.log(req.body);
  if (
    body.first_name &&
    body.email &&
    body.last_name &&
    body.dob &&
    body.password &&
    body.phone
  ) {
    //check if the user exists
    let current = null;

    database.query(
      "SELECT * FROM authentication WHERE email = ? or phone = ?",
      [body.email, body.phone],
      (error, success) => {
        if (error) {
          console.log(error);
        } else if (success) {
          current = success;

          if (current.length > 0) {
            for (var i = 0; i < current.length; i++) {
              if (current[i].email === body.email) {
                // res
                //   .status(409)
                //   .json({ Message: "That email is already taken" });
                email = true;
                break;
              } else if (current[i].phone === body.phone) {
                // res.status(409).json({
                //   Message: "That phone number is registered to someone else",
                // });
                phone = true;
                break;
              }
            }
          }
        }
      }
    );

    setTimeout(async () => {
      if (email) {
        res.status(409).json({ Message: "Email is taken" });
      } else if (phone) {
        res.status(409).json({ Message: "Phone number is registered already" });
      } else {
        //hash the password

        const salt = await bcrypt.genSalt(10);
        const hashedP = await bcrypt.hash(body.password, salt);
        database.query(
          query,
          [
            body.first_name,

            body.last_name,
            body.dob,
            body.email,
            body.phone,
            hashedP,
          ],
          (err, result) => {
            if (err) {
              res.status(500).json({ Message: "Internal Server Error" });
            } else if (result) {
              console.log("Inserted");
              res.status(200).json({
                Message:
                  "Congratulations! You are being redirected to login page",
              });
            }
          }
        );
      }
    }, 3000);

    //check if the phone number is taken
  } else {
    res.status(400).json({ Message: "please fill in all the fields" });
  }
});
// app.get("/check", (req, res) => {
//   if (req.session.myUser) {
//     console.log(req.session.myUser);
//     res.status(200).json({ User: req.session.myUser, signedIn: true });
//   } else {
//     console.log(req.session.myUser);
//     res.status(403).json({ Logged: false });
//   }
// });
//verify login
const verify = (req, res, next) => {
  //get auth_header
  const bearer_header = req.headers.authorization;
  //checkif bearer_header is undefined

  if (typeof bearer_header !== "undefined") {
    const bear = bearer_header.split(" ");

    //get token
    const token = bear[1];

    req.token = token;
    next();
  } else {
    res
      .status(403)
      .json({ Message: "Access Denied for the requested resource" });
  }
};

app.get("/dashboard", verify, (req, res) => {
  jwt.verify(req.token, "signIn", (err, data) => {
    if (err) {
      res.status(403).json({ Message: "Login first" });
    } else {
      res.status(201).json({ Message: data });
    }
  });
});

app.listen(process.env.PORT||3001, () => {
  console.log("listening on port 3002");
});
