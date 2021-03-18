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

let orderModel = require('./models/order');


// api endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/', (req, res) => {
    console.log(req.body);
    let order = req.body;
    order.items = [
        { itemName: req.body.item1 },
        { itemName: req.body.item2 },
        { itemName: req.body.item3 },
    ];
    delete order.item1;
    delete order.item2;
    delete order.item3;

    orderModel.create(order, (err, data) => {
        if(err) res.status(500).send(err)
        else {
            console.log(data);
            res.send('data inserted');
        }
    });

});

app.get('/orders', (req, res) => {
    orderModel.find((err, data) => {
        if(err) res.status(500).send(err);
        else {
            res.json(data);
        }
    });
});



let port = 3000;
app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`app server listening on port ${port}`);
});

