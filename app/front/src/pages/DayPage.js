import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function DayPage() {
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [thing, setThing] = useState('');
    const [things, setThings] = useState([]);

    const handleThingSave = () => {
        setThings([...things, thing]);
        setThing('');
    };

    const handleThingClick = (t) => {
        setThing(t);
        setThings(things.filter(th => th !== t));
    };

    const handleSave = async () => {
        const day = {
            date,
            title: title || date.toDateString(),
            things
        };

        try {
            const response = await axios.post('http://localhost:5000/api/send/days', day);
            alert(response.data.message);
        } catch (error) {
            console.error('Error sending day data:', error);
        }
    };


    return (
        <div>
            <h1>Create a Day</h1>
            <DatePicker selected={date} onChange={date => setDate(date)} />
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
            <input value={thing} onChange={e => setThing(e.target.value)} placeholder="Enter thing" />
            <button onClick={handleThingSave}>Save Thing</button>
            {things.map((th, index) => (
                <div key={index} onClick={() => handleThingClick(th)}>
                    {th}
                </div>
            ))}
            <button onClick={handleSave}>Yep - that's it! Let's save</button>
        </div>
    );
}

export default DayPage;
