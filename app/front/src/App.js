import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DayPage from './pages/DayPage';
import PersonaPage from './pages/PersonaPage';
import PictureSelectionPage from './pages/PictureSelectionPage';


function Page({ pageNumber }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/page${pageNumber}`);
      setData(response.data.message);
    };

    fetchData();
  }, [pageNumber]);

  const sendData = async () => {
    const response = await axios.post('http://localhost:5000/api/send', { data: `Data from Page ${pageNumber}` });
    alert(response.data.message);
  };

  return (
    <div>
      <h1>Page {pageNumber}</h1>
      <p>{data}</p>
      <button onClick={sendData}>Send Data</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/day">Day</Nav.Link>
              <Nav.Link as={Link} to="/persona">Persona</Nav.Link>
              <Nav.Link as={Link} to="/Pictures">Pictures</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/day" element={<DayPage />} />
        <Route path="/persona" element={<PersonaPage />} />
        <Route path="/Pictures" element={<PictureSelectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
