const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/booklistDB',{
  useNewUrlParser: true
});

const bookSchema = {
  title: String,
  author: String,
  genre: String,
  info: String
}

const Book = mongoose.model('Book', bookSchema);

const book1 = new Book({
  title: "Title",
  author: "Author",
  genre: "Genre",
  info: "Info"
});



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
    info: req.body.bookInformation,
  };

  const anotherBook = new Book({
    title: book.title,
    author: book.author,
    genre: book.genre,
    info: book.info
  });


  anotherBook.save();
  res.redirect('/bookview');
});

app.get("/info/:bookname",function(req,res){

  const day = date.getDate();

  const requestedTitle = _.lowerCase(req.params.bookname);
  const requestedID = req.body.bookId;
  console.log(requestedID);
  
  Book.findOne({_id: req.body.bookId},function(err,found){
    if(!err){
      if(!found){
        console.log("Not Found");
      } else{
        res.render('info',{
          title: found.title,
          info: found.info,
          date: day
        });
      }
    }
  });



  // books.forEach(function(book){
  //
  //     const storedTitle = _.lowerCase(book.title);
  //     if(storedTitle === requestedTitle) {
  //       res.render('info', {
  //
  //       });
  //     }
  //
  // });

});

app.get("/bookview",function(req,res){

    Book.find({},function(err,found){
      if(found.length === 0 ){
        Book.create(book1, function(error){
          if(err){
            console.log(err);
          } else{
            console.log("Inserted");
          }
        })
        res.redirect("/bookview");
      } else{
        res.render('bookview',{
          newBooks: found
        });
      }

    });

});

app.get("/update/:bookname",function(req,res){
  const requestedTitle = _.lowerCase(req.params.bookname);
  books.forEach(function(book){

      const storedTitle = _.lowerCase(book.title);
      if(storedTitle === requestedTitle) {
        res.render('update', {
          title: book.title,
          info: book.info,
          author: book.author,
          genre: book.genre
        });
      }

  });

});

//fix update
app.post("/update",function(req,res){

});
//incorporate database
//deploy application
//refactor if needed

app.listen(3000,function(req,res){
  console.log("Server started at port 3000");
});
