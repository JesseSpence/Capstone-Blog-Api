// Import needed libraries
const express = require("express"); // Used to set up a server
// const cors = require("cors"); // Used to prevent errors when working locally

const BlogPostRoute = require("./routes/BlogPostsRoute");
const UsersRoute = require("./routes/UsersRoute");
const CommentsRoute = require("./routes/CommentsRoute");

// Configure Server
const app = express(); // Initialize express as an app variable

app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests


// app.use(cors());//

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

//use static 
app.use(express.static("Public"));

// This is where we check URLs and Request methods to create functionality
// GET '/' is always what will be displayed on the home page of your application
// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome" });
// });

//get static index page on loadup
app.get("/" , function(req , res){
  res.sendFile(__dirname + "/users" + "index.html");
})


// app.get("/", (req, res) => {  to get a basic message page
//   res.json({ msg: "Welcome" });
// });

app.use("/blogposts", BlogPostRoute);
app.use("/users", UsersRoute);
app.use("/comments", CommentsRoute);

// Set up server to start listening for requests
app.listen(app.get("port"), () => {
console.log("server running")
});
  
module.exports = {
  devServer: {
    Proxy: "*",
  },
};