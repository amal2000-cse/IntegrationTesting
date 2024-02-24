//fs  module helps us enable to write into a file in nodejs
const fs = require("fs");

const path = require("path");

function save(bookData){
    try {
        //this will help us to move from out currect directory to books.json file
        fs.writeFileSync(path.join(__dirname, "..", "data", "books.json"), JSON.stringify(bookData));
        return true;
    } catch (error) {
        return false;
    }

}

module.exports = {
    save
};