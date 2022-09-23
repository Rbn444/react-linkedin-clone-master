import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AlertComponent from "./AlertComponent";
import ProfiliUtentiCard from "./ProfiliUtentiCard";
import ProfiliUtentiCompetenze from "./ProfiliUtentiCompetenze";
import CardAziende from "./profilo/CardAziende";
import CardPersone from "./profilo/CardPersone";

const ProfiliUtenti = () => {

  const params = useParams(); // Navigazione

  // REDUX
  const token = useSelector((state) => state.user.token);
  //----------------------------------------------------------------
  //STATES
  const [user, setUser] = useState({});
  const [competenze, setCompetenze] = useState([]);
  const [open, setOpen] = useState(false)
  const [mess, setMess] = useState(' ')
  //----------------------------------------------------------------

  //USE EFFECT
  useEffect(() => {
    fetchUtent();
    fetchExperiences();
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //----------------------------------------------------------------

  // FUNZIONI
  const handleClick = () => { // apre l'alert
    setOpen(true);
  };

  const fetchUtent = async () => { // ritorna il singolo utente richiesto
    const baseEndpoint = `https://striveschool-api.herokuapp.com/api/profile/${params.userId}`;
    const header = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(baseEndpoint, {
        headers: header,
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log(data);
      } else {
        setMess('Qualcosa è andato storto durante il caricamento')
        handleClick()
      }
    } catch (error) {
      setMess('Errore del server' + error.message)
      handleClick()
      console.log(error);
    }
  };

  const fetchExperiences = async () => { // ritorna le esperience dell'utente
    const baseEndpoint = `https://striveschool-api.herokuapp.com/api/profile/${params.userId}/experiences`;
    const header = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(baseEndpoint, {
        headers: header,
      });
      if (response.ok) {
        const data = await response.json();
        setCompetenze(data);
        console.log(data);
      } else {
        setMess('Qualcosa è andato storto durante il caricamento')
        handleClick()
      }
    } catch (error) {
      setMess('Errore del server' + error.message)
      handleClick()
      console.log(error);
    }
  };
  //----------------------------------------------------------------

  //RENDER
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-start  flex-column flex-md-row flex-nowrap px-4 pt-3 pb-2">
        <Col className="ProfilePrincipale">
          <AlertComponent open={open} setOpen={setOpen} mess={mess} />
          <ProfiliUtentiCard user={user} />
        </Col>
        <Col className="ProfileSecondaria">
          <CardAziende />
        </Col>
      </Row>
      <Row className="justify-content-center align-items-start flex-column flex-md-row flex-nowrap px-4 pt-3 pb-2">
        <Col className="ProfilePrincipale">
          <ProfiliUtentiCompetenze experiences={competenze} />
        </Col>
        <Col className="ProfileSecondaria">
          <CardPersone />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfiliUtenti;
