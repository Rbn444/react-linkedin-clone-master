import { Col, ListGroup, Row } from "react-bootstrap";


const ProfiliUtentiCompetenze = ({ experiences }) => {

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateCorrect = (string) => { // funzione per visualizzare la data formattata a dovere
    let date = new Date(string);
    return date
      .toLocaleDateString(undefined, options)
      .split(" ")
      .slice(2, 4)
      .join(" ");
  };

  //RENDER
  return (
    <>
      {
        experiences.length > 0 && (
          <Col className="CardProfile mb-3">
            <Col xs={12} className="CardCompetenze mt-3">
              <h4 className="text-dark">Competenze</h4>
              <ListGroup variant="flush">
                {experiences?.map((experience, index) => {
                  return (
                    <ListGroup.Item
                      className="d-flex justify-content-between p-0 mt-2"
                      key={index}
                    >
                      <Col className="mt-2" xs={3}>
                        <img
                          className="img-fluid CardCompetenzeImg"
                          src={experiences.image}
                          alt=""
                        />
                      </Col>
                      <Col xs={8}>
                        <Row>
                          <h3>
                            {experience.company.toUpperCase()} {experience.area}
                          </h3>
                        </Row>
                        <Row>
                          <h6>{experience.role}</h6>
                        </Row>
                        <Row>
                          <p className="text-secondary">
                            {dateCorrect(experience.startDate)} -{" "}
                            {dateCorrect(experience.endDate)}
                          </p>
                        </Row>
                        <Row>
                          <p>{experience.description}</p>
                        </Row>
                      </Col>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          </Col>
        )
      }
    </>
  );
};

export default ProfiliUtentiCompetenze;
