import React from "react";
import { Button, Col } from "react-bootstrap";

const CardAziende = () => {

  //RENDER
  return (
    <Col xs={12} className="d-flex flex-column CardAziende mt-3 mt-md-0 justify-content-center align-items-start p-3">
      <Col xs={12}>
        <h6 className="mt-3 mb-4">Altre aziende consultate</h6>
      </Col>
      <Col xs={12}>
        <Col className="d-flex justify-content-start">
          <img className="NavbarUserList" src="https://seeklogo.com/images/A/amazon-dark-logo-01F3CFFF03-seeklogo.com.png" alt="" />
          <div className="mb-3 ">
            <h6>
              Amazon
            </h6>
            <p className="CardAziendap">società</p>
            <Button className="CardAziendaButton" variant="outline-secondary">Collegati</Button>
          </div>
        </Col>
      </Col>

      <Col xs={12} className="d-flex justify-content-start">
        <img className="NavbarUserList" src="https://www.almaviva.it/.resources/almaviva-core/webresources/resources/img/logo-almaviva-m.png" alt="" />
        <div className="mb-3 ">
          <h6>
            Almaviva
          </h6>
          <p className="CardAziendap">società</p>
          <Button className="CardAziendaButton" variant="outline-secondary">Collegati</Button>
        </div>
      </Col>
      <Col xs={12} className="d-flex justify-content-start">
        <img className="NavbarUserList" src="https://cdn.autoblog.it/F439bVrqJkaHsG6b9VRa9N-5zjE=/1200x800/smart/https://www.autoblog.it/app/uploads/2013/04/video-tesla-model-s-il-display-touchscreen-da-17-pollici-620x350-1.jpg" alt="" />
        <div className="mb-3 ">
          <h6>
            Tesla
          </h6>
          <p className="CardAziendap">società</p>
          <Button className="CardAziendaButton" variant="outline-secondary">Collegati</Button>
        </div>
      </Col>
      <Col xs={12} className="d-flex justify-content-start">
        <img className="NavbarUserList" src="https://cdn3.iconfinder.com/data/icons/picons-social/57/56-apple-512.png" alt="" />
        <div className="mb-3 ">
          <h6>
            Apple
          </h6>
          <p className="CardAziendap">società</p>
          <Button className="CardAziendaButton" variant="outline-secondary">Collegati</Button>
        </div>
      </Col>
    </Col>
  );
};

export default CardAziende;
