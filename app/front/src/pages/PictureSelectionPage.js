import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PictureSelectionPage() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedPersonas, setSelectedPersonas] = useState([]);
    const [generationRequestId, setGenerationRequestId] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [days, setDays] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [availablePersonas, setAvailablePersonas] = useState([]);

    useEffect(() => {
        const fetchDays = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get/days');
                setDays(response.data);
            } catch (error) {
                console.error('Error fetching days:', error);
            }
        };

        const fetchPersonas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get/personas');
                setPersonas(response.data);
                setAvailablePersonas(response.data);
            } catch (error) {
                console.error('Error fetching personas:', error);
            }
        };

        fetchDays();
        fetchPersonas();
    }, []);

    const handleDayChange = (day) => {
        setSelectedDay(days.find((d) => d.id === day));
    };

    const handlePersonaChange = (selectedPersonaIds) => {
        console.log(selectedPersonaIds);
        const selectedPersonas = personas.filter((persona) => selectedPersonaIds.includes(persona.id.toString()));
        setSelectedPersonas(selectedPersonas);
    };

    const handleAddPersona = (persona) => {
        setAvailablePersonas((prev) => prev.filter((p) => p.id !== persona.id));
        setSelectedPersonas((prev) => [...prev, persona]);
    };

    const handleRemovePersona = (persona) => {
        setSelectedPersonas((prev) => prev.filter((p) => p.id !== persona.id));
        setAvailablePersonas((prev) => [...prev, persona]);
    };

    const handleSubmit = async () => {

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/generate-pictures', {
                dayId: selectedDay.id,
                personaIds: selectedPersonas.map((persona) => persona.id),
            });

            const data = response.data;
            setGenerationRequestId(data.generationRequestId);

            // Poll for picture IDs every second
            const intervalId = setInterval(async () => {
                try {
                    const statusResponse = await axios.get(`http://localhost:5000/api/generation-status/${data.generationRequestId}`);
                    const statusData = statusResponse.data;

                    if (statusData.status === 'completed') {
                        clearInterval(intervalId);
                        setPictures(statusData.pictureIds.map((id) => ({ id })));
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error('Error polling for picture IDs:', error);
                }
            }, 1000);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const handlePictureSelection = async (picture) => {
        try {
            await axios.post('http://localhost:5000/api/save-picture', {
                pictureId: picture.id,
                dayId: selectedDay.id,
                personaIds: selectedPersonas.map((persona) => persona.id),
            });

            // Handle successful saving (e.g., display a success message)
            console.log('Picture saved successfully!');
        } catch (error) {
            // Handle saving error
            console.error('Error saving picture:', error);
        }
    };

    return (
        <div>
            {/* Day selection dropdown */}
            <select value={selectedDay?.id} onChange={(e) => handleDayChange(e.target.value)}>
                <option value="">Select a Day</option>
                {days.map((day) => (
                    <option key={day.id} value={day.id}>
                        {day.title} ({new Date(day.date).toLocaleDateString()})
                    </option>
                ))}
            </select>

            {/* Available Personas */}
            <div>
                <h3>Personas to select</h3>
                <select
                    multiple
                    value={availablePersonas.map((persona) => persona.id)}
                    onChange={(e) => handlePersonaChange(Array.from(e.target.selectedOptions).map((option) => option.value))}
                >
                    {availablePersonas.map((persona) => (
                        <option key={persona.id} value={persona.id}>
                            {persona.name}
                        </option>
                    ))}
                </select>
                <button onClick={() => handleAddPersona(selectedPersonas[0])}>Add Persona</button>
            </div>

            {/* Selected Personas */}
            <div>
                <h3>Selected Personas</h3>
                <select
                    multiple
                    value={selectedPersonas.map((persona) => persona.id)}
                    onChange={(e) => handlePersonaChange(Array.from(e.target.selectedOptions).map((option) => option.value))}
                >
                    {selectedPersonas.map((persona) => (
                        <option key={persona.id} value={persona.id}>
                            {persona.name}
                        </option>
                    ))}
                </select>
                <button onClick={() => handleRemovePersona(availablePersonas[0])}>Remove Persona</button>
            </div>

            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Generating Pictures...' : 'Submit'}
            </button>

            {isLoading && <p>Loading generation request ID: {generationRequestId}</p>}

            {error && <p>Error: {error.message}</p>}

            {pictures.length > 0 && (
                <div>
                    {pictures.map((picture) => (
                        <img
                            key={picture.id}
                            src={`/api/pictures/${picture.id}`}
                            alt="Generated Picture"
                            onClick={() => handlePictureSelection(picture)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PictureSelectionPage;

