const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb+srv://rudyah.4umif.mongodb.net/mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'ru',
    pass: 'Lilimi!(!3'
});

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

const orderModel = require('./models/order');


// api endpoints
app.get('/', (req, res) => {
    res.render('index.ejs', { message : false });
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
            res.render('index.ejs', { message : "order completed"});
        }
    });

});


app.get('/admin', (req, res) => {

    orderModel.find((err, data) => {
        if(err) res.status(500).send(err);
        else {

            data.forEach((order) => {
                let currentDate = new Date();
                let orderDate = new Date(order.createdAt.valueOf());
                orderDate.setDate(orderDate.getDate() + 1);

                if(currentDate < orderDate) {
                    order.status = "in progress";
                    return;
                } 

                orderDate.setDate(orderDate.getDate() + 1);

                if(currentDate < orderDate) {
                    order.status = "dispatched";
                    return;
                } else {
                    order.status = "delivered";
                }

            });

            res.render('admin.ejs', { 
                orders: data
            });
        }
    });
});


app.post('/sendEmail', (req, res) =>{
    let order = req.body.order;
    let email = req.body.email;
    let user = req.body.user;
    let status = req.body.status;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
    to: email, // Change to your recipient
    from: 'ru@rudyah.com', // Change to your verified sender
    subject: 'Status of Order: ' + order,
    text: 'Hey ' + user + ', your order is ' + status,
    html: '<strong>Hey ' + user + ', your order is ' + status + '</strong>',
    };

    sgMail.send(msg)
    .then(() => {
        console.log('Email sent');
        res.send('Email sent');
    })
    .catch((error) => {
        console.error(error)
    });

});


let port = 3000;
app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`app server listening on port ${port}`);
});

