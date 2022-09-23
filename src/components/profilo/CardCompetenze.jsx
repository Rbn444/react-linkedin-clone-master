import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormDialogCompetenze from "./FormDialogCompetenze";
import { useLocation } from "react-router-dom";
import FormDialogDelete from "./FormDialogDelete";
import AlertComponent from "../AlertComponent"

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


const CardCompetenze = ({ setFotoBG, toggleFetch, setToggleFetch }) => {
  // REDUX
  const user = useSelector(state => state.user.user)
  const token = useSelector(state => state.user.token)
  // ---------------------------------------------------------------


  // ---------------------------------------------------------------
  const location = useLocation() // navigazione
  // ---------------------------------------------------------------


  // USESTATE
  const [experiences, setExperiences] = useState([]) // Array di oggetti esperienze
  const [deleteToggle, setDeleteToggle] = useState(false) // toggle
  const [open, setOpen] = useState(false) // toggle
  const [mess, setMess] = useState(' ') // messaggio dell'allert
  const [blobFile, setBlobFile] = useState(null) // utile per il formData
  const [experienceObj, setExperienceObj] = useState({ // oggetto per la compilazione del form
    description: '',
    area: '',
    role: '',
    company: '',
    startDate: '',
    endDate: '',
  })
  // ----------------------------------------------------------------


  // USE EFFECT
  useEffect(() => { // considera se effettuare una fetch oppure no
    if (toggleFetch === true) {
      fetchExperiences()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleFetch])

  useEffect(() => { // fa la fetch solo se il token "esiste"
    if (token) {
      fetchExperiences()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  // FUNZIONI
  const dateCorrect = (string) => { // modifica la stringa brutta del server e ne ritorna una migliore
    let date = new Date(string);
    return date.toLocaleDateString(undefined, options).split(' ').slice(2, 4).join(' ')
  }

  const handleClick = () => { // apre il messaggio di errore
    setOpen(true);
  };

  const fetchExperiences = async () => { // richiede la lista delle esperienze utente
    const baseEndpoint = "https://striveschool-api.herokuapp.com/api/profile/" + user._id + "/experiences"
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

        setExperiences(data);
        setToggleFetch(false)

        if (data.find(exp => exp.company === 'fotoBG') === undefined) {
          addExperience({
            description: 'fotoBG',
            area: 'fotoBG',
            role: 'fotoBG',
            company: 'fotoBG',
            startDate: '2022-01-10T00:00:00.000Z',
            endDate: '2022-09-22T19:49:06.558Z',
          })
        } else {
          setFotoBG(data.find(exp => exp.company === 'fotoBG'))
        }



      } else {
        setMess('Qualcosa è andato storto durante la richiesta')
        handleClick()
      }
    } catch (error) {
      setMess('Errore del server ' + error.message)
      handleClick()
      console.log(error);
    }
  }

  const addExperience = async (obj) => { // fetch che aggiunge una nuova experience
    const baseEndpoint = "https://striveschool-api.herokuapp.com/api/profile/" + user._id + "/experiences"

    const header = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(baseEndpoint, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: header,
      });
      if (response.ok) {
        const data = await response.json();
        fetchImg(data._id)
        setExperienceObj({
          description: '',
          area: '',
          role: '',
          company: '',
          startDate: '',
          endDate: '',
        })
        fetchExperiences()
      } else {
        setMess('Qualcosa è andato storto durante la creazione')
        handleClick()
      }
    } catch (error) {
      setMess('Errore del server' + error.message)
      handleClick()
      console.log(error);
    }
  }


  const fetchImg = async (expId) => { // fetch che aggiunge un'immagine ad una experience 

    const baseEndpoint = `https://striveschool-api.herokuapp.com/api/profile/${user._id}/experiences/${expId}/picture`

    try {
      let formData = new FormData();
      formData.append('experience', blobFile);

      const response = await fetch(baseEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchExperiences()

      } else {
        setMess('Qualcosa è andato storto durante il caricamento dell\'immagine')
        handleClick()
      }
    } catch (error) {
      setMess('Errore del server' + error.message)
      handleClick()
      console.log(error);
    }
  }

  // RENDER
  return (
    <Col className="CardProfile mb-3">
      <AlertComponent open={open} setOpen={setOpen} mess={mess} />
      <Col xs={12} className="CardCompetenze mt-3">
        <FormDialogCompetenze
          addExperience={addExperience}
          experienceObj={experienceObj}
          setExperienceObj={setExperienceObj}
          setDeleteToggle={setDeleteToggle}
          deleteToggle={deleteToggle}
          blobFile={blobFile}
          setBlobFile={setBlobFile} />
        <ListGroup variant="flush">

          {experiences?.map((experience, index) => {
            return (
              <ListGroup.Item className={experience.company === 'fotoBG' ? "d-flex justify-content-between p-0 mt-2 d-none" : "d-flex justify-content-between p-0 mt-2"} key={index}>
                <Col className="ColImgCompetenze d-flex justify-content-center align-items-start p-1" xs={6}>
                  {
                    experience.image && (
                      <img className="img-fluid CardCompetenzeImg" src={experience.image} alt='foto experience' />
                    )
                  }

                </Col>
                <Col xs={6}>
                  <Row>
                    <h3>{experience.company.toUpperCase()} {experience.area}</h3>
                  </Row>
                  <Row>
                    <h6 >{experience.role}</h6>
                  </Row>
                  <Row>
                    <p className='text-secondary'>{dateCorrect(experience.startDate)} - {dateCorrect(experience.endDate)}</p>
                  </Row>
                  <Row>
                    <p>{experience.description}</p>
                  </Row>
                  <Row className="justify-content-end text-danger">
                    {
                      location.pathname === '/modify' && (
                        <FormDialogDelete
                          experience={experience}
                          fetchExperiences={fetchExperiences}
                          deleteToggle={deleteToggle}
                          blobFile={blobFile}
                          setBlobFile={setBlobFile}
                        />
                      )
                    }

                  </Row>
                </Col>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Col>
    </Col>
  );
};

export default CardCompetenze;
