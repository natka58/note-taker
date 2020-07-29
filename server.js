const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static(__dirname + '/Develop/public'));
// parse incoming string or array data
app.use('/assets/js', express.static(__dirname + `/Develop/public/assets/js`));
app.use('/assets/css', express.static(__dirname + `/Develop/public/assets/css`));
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

//front end index.html path
app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/Develop/public/index.html'));

});

//notes path
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/Develop/public/notes.html'));

}); 

app.get('/api/notes', (req, res) => {
    res.json(db);

})  

app.post('/api/notes', (req, res) => {

    fs.readFile(__dirname + '/Develop/db/db.json', function (err, data) {
        var json = JSON.parse(data)
        var myObj = {
            'title' : "title",    
            'text' : "text",
            'id' : "id"   
        };
        //push the object to your array
        json.push(myObj);
            fs.writeFile(__dirname + '/Develop/db/db.json', JSON.stringify(json), function(err){
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
          });
    })
    res.sendFile(path.join(__dirname + '/Develop/public/notes.html'));
   
    // console.log(res.data);
})  
const db  = require(__dirname + '/Develop/db/db.json');  



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
