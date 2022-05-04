// import React, { useState, useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import Modal from './components/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="container">
      <div className="widget">
          <intelligence-widget apiKey="YOUR_API_KEY_HERE" topicId="a1Gb0000000LGk6EAG" language="en"></intelligence-widget>          
      </div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Embed Widget
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
  );
}

export default App;

