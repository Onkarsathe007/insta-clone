const express = require("express");
const app = express();
const { v4: uuid } = require('uuid'); 
let port = 8080;


// for handelling the post requests :
app.use(express.urlencoded({ extended: true }))
//Starting server
app.listen(port,(req,res)=>{        //listening for request 
    console.log(`Server started on port ${port}.`);
});

app.set("view engine","ejs");
const path = require("path");       //defining the path for the view
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));   //for the static files

let posts = [
    {
        id : uuid(),
        username : "theonkarsathe",
        likeCount  : 120,
        commentCount : 10,
        img : "https://economictimes.indiatimes.com/thumb/msid-91347248,width-1200,height-900,resizemode-4,imgsize-48012/karthik-aaryan.jpg?from=mdr",
        caption : "Sparkle",
    },
    {
        id : uuid(),
        username : "viratKohli",
        likeCount  : 999120,
        commentCount : 1098,
        img : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg",
        caption : "Kohli is considered one of the greatest batsmen of all time. He holds the record for the most centuries in ODI cricket and is second in the list of most international centuries scored in international cricket",
    },
    {
        id : uuid(),
        username : "christiano",
        likeCount  : 1200909,
        commentCount : 1890,
        img : "https://www.thesportsbank.net/wp-content/uploads/2010/06/christiano-ronaldo.jpg",
        caption : "vo... raaah",
    },
];
app.get("/home",(req,res)=>{
    res.render("home.ejs",{posts : posts});
});

app.get("/home/new",(req,res)=>{
    res.render("new.ejs");
})

//to handel the req post req of form to create the new text
app.post("/home/new",(req,res)=>{
    let id = uuid();
    let username = req.body.username;
    let img  = req.body.imgLink;
    let caption = req.body.caption;
    let likeCount = Math.floor(Math.random()*1000)+1;
    let commentCount = Math.floor(Math.random()*500)+1;

    posts.push({id,username,img,caption,likeCount,commentCount});
    res.redirect("/home")
})