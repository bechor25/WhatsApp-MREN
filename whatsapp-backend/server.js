const express = require('express');
const mongoose = require('mongoose');
const Messages = require('./dbMessages');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 9000;

const Pusher = require("pusher");
const { db } = require('./dbMessages');

const pusher = new Pusher({
    appId: "1149873",
    key: "1839982ab61db1700cc7",
    secret: "3858f1a55eb84de641e7",
    cluster: "ap2",
    useTLS: true
});


app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})
const connection_url = 'mongodb+srv://admin:3v26679s7EuCPQG@cluster0.vfzp7.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.once("open", () => {
    console.log("DB connected");

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})



app.listen(port, () => console.log(`server work ${port}`));