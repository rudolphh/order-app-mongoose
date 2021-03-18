let express = require('express');
let mongoose = require('mongoose');
let db = mongoose.connect('mongodb+srv://rudyah.4umif.mongodb.net/mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'ru',
    pass: 'Lilimi!(!3'
});

let path = require('path');
let app = express();
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});



let port = 3000;
app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`app server listening on port ${port}`);
});

