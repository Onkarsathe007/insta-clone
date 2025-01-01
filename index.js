const express = require("express");
const app = express();
const { v4: uuid } = require('uuid'); 
let port = 8080;
//Mysql database.
const mysql = require("mysql2");

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// for handelling the post requests :
app.use(express.urlencoded({ extended: true }));
//Starting server
app.listen(port,(req,res)=>{        //listening for request 
    console.log(`Server started on port ${port}.`);
});

app.set("view engine","ejs");
const path = require("path");       //defining the path for the view
const { error } = require("console");
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
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'instagram',
  });

app.get("/",(req,res)=>{
    res.render("login.ejs")
});

app.get("/signup",(req,res)=>{
    res.render("signup.ejs")
});

//for string the data into database.
app.post("/signup",(req,res)=>{
    let query = "INSERT INTO user VALUES (?,?,?,?)";
    const { username, password, fullname, Username } = req.body;
try{
    connection.query(query,[username, password, fullname, Username],(err,result)=>{
        if(err) throw err;
        res.send(result);  // here redirect to the login page.
    });
}catch(error){
    res.send("Error : ",err);
}
});

app.post("/login",(req,res)=>{
    const { username,password } = req.body;
    // console.log("User Name is :",username);
    // console.log("and Password is :",password);
    let query = "SELECT * FROM user WHERE username = ?";
    try{
        connection.query(query,[username],(err,result)=>{
            if(err) throw err;
            // res.send(result);
            if(result[0].username == username && result[0].password == password)
            {
                //redirect the the user to the home page
                res.send("User Found in DB");
            }else{
                res.send("No user found ")
            }
        })
    }catch(err)
    {
        res.send("Error : ",err," occured");
    }
})