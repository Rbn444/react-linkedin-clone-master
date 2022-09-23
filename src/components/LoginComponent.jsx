import { Col, Container, Row } from "react-bootstrap"
import { FaUserAlt } from 'react-icons/fa'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchUser } from "../redux/actions/actions"

const LoginComponent = () => {

    const navigate = useNavigate()//navigazione

    const dispatch = useDispatch()// REDUX

    //RENDER
    return (
        <Container fluid>
            <Row className="d-flex flex-column flex-lg-row justify-content-between">
                <Col xs={12} lg={6} className='pt-5 ps-4'>
                    <p className="loginText pt-5">Unisciti alla più grande community professionale</p>
                    <Row className="pt-5 text-center justify-content-between">
                        <Col
                            onClick={() => {
                                setTimeout(() => {
                                    navigate('/home')
                                }, 500);
                                dispatch(fetchUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4MWFhZjZkNzlhNTAwMTUwOTAyZWIiLCJpYXQiOjE2NjM1NzI2NTUsImV4cCI6MTY2NDc4MjI1NX0.Ds060cYZ_bHxEDSMxED7ORVkIVrU34tLYtwc_4RtJMk'))

                            }}
                            xs={3}
                            className="loginUser">
                            <FaUserAlt />
                            <p>Adiener</p>
                        </Col>
                        <Col
                            onClick={() => {
                                setTimeout(() => {
                                    navigate('/home')
                                }, 500);
                                dispatch(fetchUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4MWE3ZjZkNzlhNTAwMTUwOTAyZWEiLCJpYXQiOjE2NjM1NzI2MDgsImV4cCI6MTY2NDc4MjIwOH0.2hdtXjC--6_rLMvlCzuIUbqOMYhPbOsWfYRrh1XiEis'))

                            }}
                            xs={3}
                            className="loginUser">
                            <FaUserAlt />
                            <p>Manuel</p>
                        </Col>
                        <Col
                            onClick={() => {
                                setTimeout(() => {
                                    navigate('/home')
                                }, 500);
                                dispatch(fetchUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4MjJhNjZkNzlhNTAwMTUwOTAyZjEiLCJpYXQiOjE2NjM1NzQ2OTQsImV4cCI6MTY2NDc4NDI5NH0.ezK-E4uTEw3clUOKEVsiGo9Vvd_MWFTaScyrrTu1IF4'));

                            }}
                            xs={3}
                            className="loginUser">
                            <FaUserAlt />
                            <p>Ruben</p>
                        </Col>
                    </Row>
                </Col>
                <Col className="loginLogoCol" xs={12} lg={6}>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginComponent