const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const books = [];

app.get("/",function(req,res){
  res.render('home');
});

app.post("/",function(req,res){

});

app.get("/add",function(req,res){
  res.render('add');
});
app.post("/add",function(req,res){

  const book = {
    title: req.body.bookTitle,
    author: req.body.bookAuthor,
    genre: req.body.bookGenre,
    info: req.body.bookInformation
  };

  books.push(book);
  res.redirect('/bookview');
});

app.get("/info/:bookname",function(req,res){

  const requestedTitle = _.lowerCase(req.params.bookname);
  books.forEach(function(book){

      const storedTitle = _.lowerCase(book.title);
      if(storedTitle === requestedTitle) {
        res.render('info', {
          title: book.title,
          info: book.info
        });
      }

  });

});

app.get("/bookview",function(req,res){
  res.render('bookview', {newBooks: books});
});

//make user edit the informations


app.listen(3000,function(req,res){
  console.log("Server started at port 3000");
});
