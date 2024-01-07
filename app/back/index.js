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

app.get('/api/get/days', (req, res) => {
    const days = [
        {
            "id": 1,
            "date": "2024-01-06T22:34:09.000Z",
            "title": "Chilling at home",
            "things": [
                "mirrors edge",
                "mister bean",
                ""
            ]
        },
        {
            "id": 2,
            "date": "2024-01-08T00:00:00.000Z",
            "title": "Idyll in the park",
            "things": [
                "blanket",
                "sunscreen",
                "frisbee",
                "fruit salad"
            ]
        },
        {
            "id": 3,
            "date": "2024-01-10T00:00:00.000Z",
            "title": "Adventure awaits",
            "things": [
                "sturdy boots",
                "backpack",
                "water bottle",
                "map"
            ]
        },
        {
            "id": 4,
            "date": "2024-01-12T00:00:00.000Z",
            "title": "Cozy night in",
            "things": [
                "popcorn",
                "comfy blankets",
                "favorite movies",
                "board games"
            ]
        },
        {
            "id": 5,
            "date": "2024-01-14T00:00:00.000Z",
            "title": "Creative burst",
            "things": [
                "canvases",
                "paints",
                "brushes",
                "notebooks",
                "inspirational prompts"
            ]
        },
        {
            "id": 6,
            "date": "2024-01-16T00:00:00.000Z",
            "title": "City lights and laughter",
            "things": [
                "concert tickets",
                "comfortable shoes",
                "friends",
                "ramen money"
            ]
        }
    ];
    res.json(days);
});

app.get('/api/get/personas', (req, res) => {
    const personas = [
        {
            "id": 1,
            "name": "Svenja",
            "attributes": [
                "blonde",
                "blue eyes"
            ]
        },
        {
            "id": 2,
            "name": "Liam",
            "attributes": [
                "athletic",
                "outgoing",
                "curious",
                "resourceful"
            ]
        },
        {
            "id": 3,
            "name": "Sophia",
            "attributes": [
                "creative",
                "introspective",
                "expressive",
                "detail-oriented"
            ]
        },
        {
            "id": 4,
            "name": "Maya",
            "attributes": [
                "friendly",
                "bubbly",
                "charismatic",
                "enjoys talking"
            ]
        },
        {
            "id": 5,
            "name": "Ethan",
            "attributes": [
                "analytical",
                "logical",
                "problem-solver",
                "enjoys gadgets"
            ]
        },
        {
            "id": 6,
            "name": "Chloe",
            "attributes": [
                "comfortable with routine",
                "enjoys quiet",
                "loves reading and baking"
            ]
        }
    ];
    res.json(personas);
});



app.listen(5000, () => console.log('Server is running on port 5000'));