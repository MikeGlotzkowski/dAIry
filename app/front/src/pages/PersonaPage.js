import React, { useState } from 'react';
import axios from 'axios';

function PersonaPage() {
    const [name, setName] = useState('');
    const [attribute, setAttribute] = useState('');
    const [attributes, setAttributes] = useState([]);

    const handleAttributeSave = () => {
        setAttributes([...attributes, attribute]);
        setAttribute('');
    };

    const handleAttributeClick = (attr) => {
        setAttribute(attr);
        setAttributes(attributes.filter(a => a !== attr));
    };

    const handleSave = async () => {
        const response = await axios.post('http://localhost:5000/api/send/personas', { name, attributes });
        alert(response.data.message);
    };

    return (
        <div>
            <h1>Create a Persona</h1>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
            <input value={attribute} onChange={e => setAttribute(e.target.value)} placeholder="Enter attribute" />
            <button onClick={handleAttributeSave}>Save Attribute</button>
            {attributes.map((attr, index) => (
                <div key={index} onClick={() => handleAttributeClick(attr)}>
                    {attr}
                </div>
            ))}
            <button onClick={handleSave}>I'm done - let's save this.</button>
        </div>
    );
}

export default PersonaPage;
