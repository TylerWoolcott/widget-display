import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PopupModal(props) {
    let scriptString =  '<script type="text/javascript" src="https://widget-host.vercel.app/index.js"> </script>'
    let webComponentString = '<intelligence-widget apiKey="YOUR_API_KEY_HERE" topicId="a1Gb0000000LGk6EAG"></intelligence-widget>'

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Embed maps in your site
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Web component</h4>
          <p>
        {scriptString}
        <br />
        {webComponentString}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  