const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require("../middleware/auth");
// const nodemailer = require('nodemailer');

//get all blogs
router.get("/",  (req, res) => {
  try {
    let sql = "SELECT * FROM BlogPosts";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//ADD A BlogPost
router.post("/",  (req, res) => {
  return adminController.addBlogPost(req, res);
});

// GET SINGLE BlogPost
router.get("/:id", (req, res) => {
  return displayController.SingleBlogPost(req, res);
});

//EDIT A BlogPost
router.put("/:id", middleware, (req, res) => {
  return adminController.editBlogPost(req, res);
});

// DELETE A BlogPost
router.delete("/:id", middleware, (req, res) => {
  return adminController.deleteBlogPost(req, res);
});

module.exports = router;