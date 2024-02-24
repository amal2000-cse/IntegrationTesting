const express = require('express');
const bookRoute =require("./routes/books.routes.js");


const app = express();
app.use(express.json());

app.use("/api/wishlists",bookRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});