const express = require('express');
const path = require('path');
require('dotenv/config');


const bodyParser = require('body-parser')

const mongoose = require('mongoose');
const Stack = require('./models/Stack');
const SectionContainer = require ('./models/SectionContainer');


const app = express();



app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));
app.use("/static", express.static(path.resolve(__dirname, "public", "static")))

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true  },  () => {
    console.log("Db connected");
});



app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/sets', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/explore', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/stacks', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/stacks/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/api/sets', async (req, res) => {
    try {
        const stacks = await Stack.find();
        res.json(stacks);
    }
    catch (err) {
        res.json({message: err});
    }
});


app.get('/api/dividers', async (req, res) => {
    try {
        const sectionContainers = await SectionContainer.find().populate('stacks');
        res.json(sectionContainers);
    }
    catch (err) {
        res.json({message: err});
    }
});

app.post('/api/newdivider', (req, res) => {
    console.log("server.js: req.body: " + req.body);
    console.log("server.js: req.body.sectionContainerName: " + req.body.sectionContainerName);
    console.log("typeof req.body.sectionContainerName: " + typeof req.body.sectionContainerName);
    console.log("server.js: req.body.stacks: " + req.body.stacks)
    console.log("typeof req.body.stacks: " + typeof req.body.stacks);
    console.log("isArray() req.body.stacks: " + Array.isArray(req.body.stacks));

    const divider = new SectionContainer({
        sectionContainerName: req.body.sectionContainerName,
        stacks: req.body.stacks
    });

    try {
        const savedDivider = divider.save();
        res.json(savedDivider);
    } catch (err){
        console.log('error in app post');
        res.json({message: err});
    }

})

app.post('/api/new_stack', async (req, res) => {


    const stack = new Stack({
        stackName: req.body.stackName,
        divider: mongoose.Types.ObjectId(req.body.divider),
        cards: req.body.cards
    });

    try {
        const savedStack = stack.save();

        // console.log("stack._id: " + stack._id)
        // console.log("req.body.divider: " + mongoose.Types.ObjectId(req.body.divider))
        // console.log(await SectionContainer.findOne({_id: req.body.divider}))
        // console.log(await SectionContainer.findById(mongoose.Types.ObjectId(req.body.divider)).sectionContainerName)

        const divider = await SectionContainer.findOne({_id: req.body.divider});
        const dividerName = divider.sectionContainerName

        console.log("divider: " + divider)
        console.log("dividerName: " + dividerName)

        await SectionContainer.findByIdAndUpdate(
            req.body.divider,
            { $push: { stacks: stack._id } },
            { new: true, useFindAndModify: false }
        )
        //res.json(savedStack);
        res.json({dividerName: dividerName})
    } catch (err){
        console.log('error in app post');
        res.json({message: err});
    }

})

app.post('/', async (req, res) => {
    console.log(req.body);
    const stack = new Stack({
        stackName: req.body.title
    });

    try {
        const savedStack = await stack.save();
        res.json(savedStack);
    } catch (err){
        console.log('error in app post');
        res.json({message: err});
    }

})

app.listen(8001);