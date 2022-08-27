const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require("../middleware/auth");

//tst comment
router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM Comments", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.get("/blogposts/:id", (req, res) => {

    try {
        con.query(`SELECT * FROM Comments WHERE blogpostID = "${req.params.id}"`, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.post("/",(req,res) => {
 
    try {
        con.query(`SELECT * FROM BlogPosts WHERE id = "${req.body.blogpostID}" `, (err, result) => {
            if (err) throw err.message;
            if(result === 0){
                res.send("cannot find post")
            }else{
                const comment = {
                    userID: req.body.userID,
                    blogpostID: req.body.blogpostID,
                    comment:req.body.comment
                  } 
                  try {
                    let sql = "INSERT INTO Comments SET ?"
                    con.query(sql, comment
                      , (err, result) => {
                        if (err) throw err.message;
                        res.send(result)})
                  } catch (error) {
                      console.log(error);
                      res.status(400).send(error)
                  }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.delete("/:id",(req, res) => {
    // if (user.user_type === "admin") {
        try {
            con.query(`SELECT * FROM Comments WHERE comment_id = "${req.params.id}"`, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    // } else {
    //     res.send("Access Denied");
    // }
});

module.exports = router;