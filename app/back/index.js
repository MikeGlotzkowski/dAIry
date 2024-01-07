const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/page1', (req, res) => {
    res.json({ message: 'Hello from Page 1!' });
});

app.get('/api/page2', (req, res) => {
    res.json({ message: 'Hello from Page 2!' });
});

app.get('/api/page3', (req, res) => {
    res.json({ message: 'Hello from Page 3!' });
});

app.get('/api/page4', (req, res) => {
    res.json({ message: 'Hello from Page 4!' });
});

app.post('/api/send', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Data received!' });
});

app.post('/api/send/personas', (req, res) => {
    console.log(req.body);
    res.json({ message: req.body });
});

app.post('/api/send/days', (req, res) => {
    console.log(req.body);
    res.json({ message: req.body });
});

app.listen(5000, () => console.log('Server is running on port 5000'));