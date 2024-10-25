const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const {v4 :uuidv4}=require('uuid');

var methodOverride = require('method-override')

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fixed this line
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method'));

// Initial posts data
let posts = [
    { Id:uuidv4(), username: "ayoob khan", content: "I am so excited" },
    {Id: uuidv4(), username: "zubair alam", content: "I am quite well" },
    {Id:uuidv4(),  username: "sohel khan", content: "I am over the moon" },
    {Id:uuidv4(),  username: "arshd khan", content: "Allah helps everyone" },
];

// Route to render posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// Route to render new post form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Route to handle form submission
app.post("/posts", (req, res) => {
   
    let { username, content } = req.body;
    let Id = uuidv4();
    posts.push({Id, username, content });
     res.redirect("/posts");
});


app.get("/posts/:Id",(req,res)=>{
    let {Id}=req.params;
    let post = posts.find((p)=>Id===p.Id);
    res.render("show.ejs",{post});
});


app.get("/posts/:Id/edit",(req,res)=>{
    let {Id}=req.params;
   let post = posts.find((p)=>Id===p.Id);
   res.render("edit.ejs",{ post});
});

app.patch("/posts/:Id",(req,res)=>{
    let {Id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>Id === p.Id);
    post.content=newContent;
    res.redirect("/posts");
})

app.delete("/posts/:Id",(req,res)=>{
    let {Id}= req.params;
    posts=posts.filter((p)=>Id !==p.Id);
   
   
   res.redirect("/posts");

})


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

