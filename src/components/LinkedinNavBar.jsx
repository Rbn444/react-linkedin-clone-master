import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Card, ListGroup } from "react-bootstrap";
import { BsLinkedin, BsBriefcaseFill, BsGrid3X3GapFill } from "react-icons/bs";
import { ImHome3 } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";
import {
  MdSupervisorAccount,
  MdNotifications,
  MdPostAdd,
  MdGroups,
} from "react-icons/md";
import { TbMessageCircle, TbFileCertificate } from "react-icons/tb";
import { GoBook } from "react-icons/go";
import { CgInsights } from "react-icons/cg";
import { FcAdvertising } from "react-icons/fc";
import { ImCompass2 } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOKEN, SET_USER } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LinkedinNavbar = () => {
  //STATES
  const [formToggle, setFormToggle] = useState(false);
  const [show, setShow] = useState(false);
  //----------------------------------------------------------------

  //FUNZIONI
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //---

  //REDUX
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.user.user);
  //----------------------------------------------------------------

  const navigate = useNavigate() // Navigazione

  // RENDER
  return (
    <Navbar sticky="top" className="NavBarLinkedin" bg="light">
      <Container fluid className="NavBarLinkedin">
        <div className="NavbarDiv">
          <Navbar.Brand>
            <Link to="/home">
              <BsLinkedin className="NavBarLogo" />{" "}
            </Link>
          </Navbar.Brand>
          <Form className="d-flex NavbarForm align-self-start mt-1">
            <Form.Control
              style={{ width: "100%" }}
              onBlur={() => setFormToggle(false)}
              className={
                formToggle ? " d-lg-block w-100 " : "d-none d-lg-block me-2  "
              }
              type="search"
              placeholder="Cerca"
              aria-label="Search"
            />
          </Form>
        </div>
        <Nav
          className=" NavBarLinkedin "
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          {!formToggle && (
            <>
              <Nav.Link>
                <div
                  onClick={() => setFormToggle(true)}
                  className="NavbarHover  d-flex flex-column align-items-center"
                >
                  <AiOutlineSearch className="NavBarAllLogo d-lg-none d-block" />{" "}
                  <span className="NavBarSpan text-center  d-lg-none ">
                    Cerca
                  </span>
                </div>
              </Nav.Link>
              <Link to="/home" className="text-decoration-none nav-link">
                <div className="NavbarHover  d-flex flex-column align-items-center">
                  <ImHome3 className="NavBarAllLogo" />{" "}
                  <span className="NavBarSpan text-center">Home</span>
                </div>
              </Link>
              {selector.name && (
                <NavDropdown
                  title={
                    <div className="d-flex flex-column align-items-center ">
                      <img
                        className="NavbarUser"
                        src={selector.image}
                        alt="user"
                      />{" "}
                      <span className="NavBarSpan text-center">
                        {selector.name}
                      </span>
                    </div>
                  }
                  id="navbarScrollingDropdown "
                >
                  <NavDropdown.Item>
                    <div className="d-flex justify-content-around">
                      <img
                        className="NavbarUserList "
                        src={selector.image}
                        alt=""
                      />
                      <div>
                        <h6>
                          {selector.name} {selector.surname}
                        </h6>
                        <p>{selector.title}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate('/profile')}
                      variant="outline-primary w-100" className="ButtonDropDownNav">
                      Visualizza Profilo
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    <h6>Account</h6>
                    <ul className="dropdown-list">
                      <li className="NavBarList">Impostazioni e privacy</li>
                      <li className="NavBarList">Guida</li>
                      <li className="NavBarList">Lingua</li>
                    </ul>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    <h6>Gestisci</h6>
                    <ul className="dropdown-list">
                      <li className="NavBarList">Post e Attività</li>
                      <li className="NavBarList">
                        {"Account per la pubblicazione di offerte".substring(
                          0,
                          30
                        ) + "..."}
                      </li>
                    </ul>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch({
                        type: SET_USER,
                        payload: {}
                      })
                      dispatch({
                        type: SET_TOKEN,
                        payload: ''
                      })
                      setTimeout(() => {
                        navigate('/')
                      }, 500);
                    }
                    }
                  >
                    <h6>Esci</h6>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link className="text-center">
                <div className="NavbarHover d-flex flex-column align-items-center">
                  <MdSupervisorAccount className="NavBarAllLogo" />{" "}
                  <span className="NavBarSpan text-center">Rete</span>
                </div>
              </Nav.Link>
              <Nav.Link className="text-center">
                <div className="NavbarHover d-flex flex-column align-items-center">
                  <BsBriefcaseFill className="NavBarAllLogo" />{" "}
                  <span className="NavBarSpan text-center">Lavoro</span>
                </div>
              </Nav.Link>
              <Nav.Link className="text-center">
                <div className="NavbarHover d-flex flex-column align-items-center">
                  <TbMessageCircle className="NavBarAllLogo" />{" "}
                  <span className="NavBarSpan text-center">Messaggistica</span>
                </div>
              </Nav.Link>
              <Nav.Link className="text-center">
                <div className="NavbarHover d-flex flex-column align-items-center">
                  <MdNotifications className="NavBarAllLogo" />{" "}
                  <span className="NavBarSpan text-center">Notifiche</span>
                </div>
              </Nav.Link>

              <Button variant="none" onClick={handleShow}>
                <div className="NavbarHover d-flex flex-column align-items-center">
                  <BsGrid3X3GapFill className="NavBarAllLogo" />{" "}
                  <span className="NavBarSpan text-center">Lavoro</span>
                </div>
              </Button>
            </>
          )}

          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Lavoro</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Card border="light" style={{ width: "auto" }}>
                <Card.Header>
                  <h5>Scopri altri prodotti Linkedin</h5>
                </Card.Header>
                <Card.Body>
                  <div className="CanvassDiv ">
                    <div className="canvassCardDiv">
                      <GoBook className="NavBarAllLogoCanvass" />
                      <span className="text-center">Learning</span>
                    </div>
                    <div className="canvassCardDiv">
                      <CgInsights className="NavBarAllLogoCanvass" />
                      <span className="text-center">Insights</span>
                    </div>
                    <div className="canvassCardDiv">
                      <MdPostAdd className="NavBarAllLogoCanvass" />
                      <span className="text-center">Pubblica un'offerta</span>
                    </div>
                    <div className="canvassCardDiv">
                      <FcAdvertising className="NavBarAllLogoCanvass" />
                      <span className="text-center">Pubblicizza</span>
                    </div>
                    <div className="canvassCardDiv">
                      <ImCompass2 className="NavBarAllLogoCanvass" />
                      <span className="text-center">Trova lead</span>
                    </div>
                    <div className="canvassCardDiv">
                      <MdGroups className="NavBarAllLogoCanvass" />
                      <span className="text-center">Gruppi</span>
                    </div>
                    <div className="canvassCardDiv">
                      <TbFileCertificate className="NavBarAllLogoCanvass" />
                      <span className="text-center">
                        Marketplace dei servizi
                      </span>
                    </div>
                    <div className="canvassCardDiv">
                      <FaMoneyBillWave className="NavBarAllLogoCanvass" />
                      <span className="text-center">Salary</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card border="light" style={{ width: "auto" }}>
                <Card.Header>
                  <h5>Assistenza alle aziende di Linkedin</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <span className="h6">Talent Solutions</span>
                      <br />
                      <small className="canvassSmaller">
                        {" "}
                        Trova, attrai e assumi
                      </small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="h6">Sales Solutions</span>
                      <br />
                      <small className="canvassSmaller">
                        Sblocca nuove opportunità di vendita
                      </small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="h6">
                        Pubblica offerta di lavoro gratuita
                      </span>
                      <br />
                      <small className="canvassSmaller">
                        Raggiungi i migliori candidati con la tua offerta di
                        lavoro
                      </small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="h6">Marketing Solutions</span>
                      <br />
                      <small className="canvassSmaller">
                        Acquisisci clienti e fai crescere la tua azienda
                      </small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="h6">Learning Solutions</span>
                      <br />
                      <small className="canvassSmaller">
                        Promuovi l'acquisizione di competenze nella tua
                        organizzazione
                      </small>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Offcanvas.Body>
          </Offcanvas>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default LinkedinNavbar;
