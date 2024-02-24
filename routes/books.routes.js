const express =require('express');
const bookData = require('../data/books.json');

const routes =express.Router();
const {check ,validationResult}=require('express-validator');
const {save} = require('../services/save.services')
routes.get("/",(req,res)=>{
    // res.send("Hello World");
    res.json(bookData);
    console.log(bookData);
})

//post request to add books
//to check our post for invalid entries by the client, we are going to use express validator package
//here we are adding a middleware. to check is the client have entered everything correct
routes.post('/',[
    check('name','Book name is required').not().isEmpty(),
    check('author','author is required').not().isEmpty(),
],(req,res)=>{

    //now next step is to validate if we have recived an error or not
    const errors=validationResult(req);
    if(!errors.isEmpty()){
                          //the errors.array() is actually coming from bookroute.integration.test.js file
                          //where we have added a test to check if we have recived an error, we will return an error array

        console.log(errors.array());
        return res.status(400).json({
            errors:errors.array()
            
        });
    }

    //after getting the data from the req.body we will be pushing it to the books.json file
    console.log(req.body);
    const {name, author}=req.body;
    bookData.push({
        name,
        author,
        id:Math.random(),
    })

    const isSaved = save(bookData);
    if(!isSaved){
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        })
    }

    res.json({
        message:"Success"
    })
    // res.status(200).json({ message: "Book added successfully" });

    // const book={
    //     name:req.body.name,
    //     author:req.body.author
    // }

    // const {}=req.params;

})

routes.put("/:bookid",(req,res)=>{
    const {bookid}=req.params;
    const {name, author}=req.body;
    const foundBook=bookData.find((book)=>book.id==bookid)

    if(!foundBook){
        return res.status(404).send({
            error:true,
            message:"Book not found"
        })
    }
    
    let updatedBook = null;
    const updatedBooks = bookData.map((book)=>{
        if(book.id==bookid){
            updatedBook={
                ...book,
                 name,
                 author
            }
            return updatedBook;
        }
        return book;
    })

    const isSaved=save(updatedBooks);
    if(!isSaved){
        return res.status(500).json({
            error:true,
            message:"Could not save book"
        })
    }
    //201 - successfully added resource
    res.status(201).json(updatedBook);
})

//delete request route
routes.delete("/:bookid",(req,res)=>{
    const {bookid}=req.params;
    const foundBook=bookData.find((book)=>book.id==bookid);
    if(!foundBook){
        return res.status(404).send({
            error:true,
            message:"Book not found"
        })
    }
    const updatedBooks = bookData.filter((book)=>book.id!=bookid);
    const isSaved=save(updatedBooks);
    if(!isSaved){
        return res.status(404).json({
            error:true,
            message:"Could not save book"
        })
    }
    //201 - successfully added resource
    res.status(201).json({
        message:"Success"
    });})


module.exports = routes;