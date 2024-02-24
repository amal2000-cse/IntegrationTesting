const express = require("express");
const request = require("supertest");
const bookRoute = require("../routes/books.routes.js");
//here we are testing api routes
//so we have to bring in the api routes - which we are using

const app = express();

//this helps us to except json data from the client
app.use(express.json());

app.use("/api/wishlists", bookRoute);

//now we can write our api tests

//for saving the mock data in side the json
jest.mock("../data/books.json",()=>
    [
        { "name": "Call of the wild", "author": "Louis wilder", "id": 1 },
        { "name": "Love like no other", "author": "Charlie Bronsey", "id": 2 },
        { "name": "Face Off", "author": "John Travolta", "id": 0.19989608050404506 }
      
    ]
      
)

describe("Integration test for the books API", () => {
  //This is where we write all our tests
  //1. first operation that we want to do is the api to get all the books
  it("GET /api/wishlists - success - get all the books", async () => {
    const { body, statusCode } = await request(app).get("/api/wishlists");

    //since here we are excepting a array of books back
    //we need to make sure that we are getting what we are expecting
    //so for that we use .toEqual()
    //inside the books.json file are expecting a array of objects
    expect(body).toEqual(
      expect.arrayContaining([
        //here writing expect.objectContaining as we are getting the objects from the array
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          author: expect.any(String),
        }),
      ])
    );

    //here we are also expecting the status code
    expect(statusCode).toBe(200);
  });

  //next is testing by using POST method
  //ie: if the process fails - this is the test case for that

  it("POST /api/wishlists - faliure on invalid post body", async () => {
    // here we are also adding .send as we are using POST method  and we will be sending the data also
    const { body, statusCode } = await request(app).post("/api/wishlists").send({
      name: "",
      author: "amal manoj",
    });
    console.log(body);
    expect(statusCode).toBe(400);
    //we are also expecting the body to give error message
    // console.log(errors);
    expect(body).toEqual({
      errors: [
        {
          type: "field",
          location: "body",
          msg: "Book name is required",
          path: "name",
          value: "",
        },
      ],
    });
  });

  //test case if the book it able to add to the books.json
  it("POST /api/wishlists - success", async () => {
    const { body, statusCode } = await request(app).post("/api/wishlists").send({
      name: "mayo",
      author: "mayo manoj",
    });

    expect(statusCode).toBe(200);
    expect(body).toEqual({
      message: "Success",
    });
  });

  //test case for update request

  //1) if the book id is not found
  //write the id as 5000 as that id is not present
  //so we can test how it will repond when the error happens when the id id not found
  it("PUT /api/wishlists/:bookid - failure when book is not found", async () => {
    //here what is happening is that, this is going to look for book with id 5000
    //and update the details with name: mayo put and author:mayo manoj put
    const { body, statusCode } = await request(app)
      .put("/api/wishlists/5000")
      .send({
        name: "mayo put",
        author: "mayo manoj put",
      });

    //404 - means resource not found
    expect(statusCode).toBe(404);
    expect(body).toEqual({
      error: true,
      message: "Book not found",
    });
  });

  //2) if the book id is found
  it("PUT /api/wishlists/:bookid - success", async () => {
    const { body, statusCode } = await request(app).put("/api/wishlists/1").send({
      name: "mayo put possiable",
      author: "mayo manoj put possiable",
    });

    expect(statusCode).toBe(201);
    expect(body).toEqual({
      name: "mayo put possiable",
      author: "mayo manoj put possiable",
      id: 1,
    });
  });

  //test case for delete request

  //1) when the book is not found
  it("DELETE /api/wishlists/:bookid - failure when book is not found", async () => {
    const { body, statusCode } = await request(app).delete("/api/wishlists/1000");

    expect(statusCode).toBe(404);
    expect(body).toEqual({
      error: true,
      message: "Book not found",
    });
  });

  //2) this is the success route for delete
  it("DELETE /api/wishlists/:bookid - failure when book is not found", async () => {
    const { body, statusCode } = await request(app).delete("/api/wishlists/1");

    expect(statusCode).toBe(201);
    expect(body).toEqual({
      message: "Success",
    });
  });
});
