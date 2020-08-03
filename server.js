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

    //	console.log(db);
    //	console.log("     get req");
    //  res.json(db);
    fs.readFile(__dirname + '/Develop/db/db.json', function (err, data) {
        var json = JSON.parse(data);
        res.json(json);

        //	console.log(json);
    })

})

app.delete('/api/notes/:id', (req, res) => {
    //	console.log(req.params.id);
    fs.readFile(__dirname + '/Develop/db/db.json', function (err, data) {
        var json = JSON.parse(data);
        const index = json.findIndex(x => x.id === req.params.id);

        if (index !== undefined) json.splice(index, 1);

        //	console.log(json);
        fs.writeFile(__dirname + '/Develop/db/db.json', JSON.stringify(json), function (err) {
            if (err) throw err;
            res.json(db);
        });
    })

})

app.post('/api/notes', (req, res) => {

    //	console.log(JSON.stringify(req.body));
    fs.readFile(__dirname + '/Develop/db/db.json', function (err, data) {
        var json = JSON.parse(data)
        var myObj = {
            'title': req.body.title,
            'text': req.body.text,
            'id': req.body.id
        };
        //push the object to your array
        json.push(myObj);
        fs.writeFile(__dirname + '/Develop/db/db.json', JSON.stringify(json), function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
            //		console.log("post");
            // console.log(db);
            res.json(db);
        });
    })



    // app.post('/api/notes', (req, res) => {

    //     let length = db.length;
    //     let newId = length;
    //     newId = newId.toString();
    // let reqB = req.body;
    // db.push({title: reqB.title, text: reqB.text, id: newId});

    //         //push the object to your array

    //         fs.writeFileSync(
    //             path.join(__dirname, "/Develop/db/db.json"),
    //             JSON.stringify({ db }, null, 2)
    //           );
    //           res.json(db);
    //         })
    //     // res.sendFile(path.join(__dirname + '/Develop/public/notes.html'));

    //     // console.log(res.data);

})

var db = require(__dirname + '/Develop/db/db.json');



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
