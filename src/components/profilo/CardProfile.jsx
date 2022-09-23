import { Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { BsThreeDots } from 'react-icons/bs'
import { BiPencil } from 'react-icons/bi'
import FormDialog from "./FormDialog"
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useEffect, useState } from "react"
import { fetchUser } from "../../redux/actions/actions"
import AlertComponent from "../AlertComponent"



const CardProfile = ({ fotoBG, setToggleFetch }) => {
    //REDUX
    const token = useSelector(state => state.user.token)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    // ----------------------------------------------------------------

    // STATES 
    const [blobFile, setBlobFile] = useState(null) // serve per il formData
    const [blobFile2, setBlobFile2] = useState(null)// serve per il formData
    const [open, setOpen] = useState(false) // apre il messaggio di errore
    const [mess, setMess] = useState(' ') // setta il messaggio di errore
    const [toggleFoto, setToggleFoto] = useState(false)// toggle per far comparire il pulsante modifica foto profilo
    //----------------------------------------------------------------

    //USE EFFECT
    useEffect(() => { // fetch per cambiare immagine profilo
        if (blobFile?.name.length > 0) {
            fetchImg()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blobFile])

    useEffect(() => { // uguale a quella di sopra solo che per il background
        if (blobFile2?.name.length > 0) {
            fetchBgImg(fotoBG._id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blobFile2])
    //----------------------------------------------------------------

    //FUNZIONI
    const fetchImg = async () => { // fetch per modificare l'immagine di profilo

        const baseEndpoint = `https://striveschool-api.herokuapp.com/api/profile/${user._id}/picture`

        try {
            let formData = new FormData();
            formData.append('profile', blobFile);
            const response = await fetch(baseEndpoint, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                dispatch(fetchUser(token))
                setToggleFoto(false)
            } else {
                setMess('Qualcosa è andato storto durante la richiesta')
                handleClick()
            }
        } catch (error) {
            setMess('Errore del server' + error.message)
            handleClick()
            console.log(error);
        }
    }

    const fetchBgImg = async (expId) => { // fetch per modificare l'immagine di background

        const baseEndpoint = `https://striveschool-api.herokuapp.com/api/profile/${user._id}/experiences/${expId}/picture`

        try {
            let formData = new FormData();
            formData.append('experience', blobFile2);

            const response = await fetch(baseEndpoint, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setToggleFetch(true)
            } else {
                alert("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = () => { // funzione dell'allert
        setOpen(true);
    };
    //----------------------------------------------------------------

    // RENDER 
    return (
        <Col className='CardProfile'>
            <AlertComponent open={open} setOpen={setOpen} mess={mess} />
            <Col
                style={{
                    backgroundImage: 'url(' + fotoBG?.image + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="CardProfileImages"
                xs={12}
            >
                <Col className={toggleFoto ? "text-end d-flex justify-content-between align-items-center  CardProfileImagesPencil" : "text-end d-flex justify-content-end align-items-center  CardProfileImagesPencil"} xs={12}>
                    {
                        toggleFoto && (
                            <Col xs={6} className='text-start'>
                                <form encType="multipart/form-data" id='form'>
                                    <label htmlFor="inputMod"><ImageOutlinedIcon className="text-light" /></label>
                                    <input
                                        onChange={(e) => {
                                            setBlobFile(e.target.files[0])
                                        }}
                                        style={{ display: 'none' }} type="file" id="inputMod" />
                                </form>
                            </Col>
                        )
                    }

                    <Col xs={6} className='colPencil'>
                        <form encType="multipart/form-data" id='form'>
                            <label htmlFor="inputBg"><BiPencil className="bg-light text-primary CardProfileImagesPenciBi" /></label>
                            <input
                                onChange={(e) => {
                                    setBlobFile2(e.target.files[0])

                                }}
                                style={{ display: 'none' }} type="file" id="inputBg" />
                        </form>

                    </Col>
                </Col>
                <Col xs={3} className='CardProfileCerchio d-flex align-items-end'>
                    <img
                        onClick={() => { setToggleFoto(!toggleFoto) }}
                        className="img-fluid CardProfileCerchioImg"
                        src={user.image}
                        style={{ cursor: 'pointer' }}
                        alt="profilo" />
                </Col>
            </Col>
            <FormDialog />
            <Col xs={12} className='CardProfileText'>
                <h3>{user.name} {user.surname}</h3>
                <p>{user.title}</p>
                <p className="text-secondary">{user.area}{' '}<span className="text-primary">informazioni di contatto</span> </p>
            </Col>
            <Col xs={12} className='d-flex justify-content-evenly '>
                <Col xs={4} sm={3} md={3}>
                    <Button variant='primary CardProfileButton1' >Disponibile per</Button>
                </Col>
                <Col xs={4} sm={5} md={5}>
                    <Button variant='light' className="text-primari CardProfileButton2" >Aggiungi sezione del profilo</Button>
                </Col>
                <Col xs={2} sm={3} md={2}>
                    <Button variant='light' className="text-secondary CardProfileButton3" ><BsThreeDots /></Button>
                </Col>
            </Col>
            <Col xs={12} className='d-flex justify-content-start p-4'>
                <Col className="CardProfileDisp" xs={8}>
                    <h6 className="m-0">Disponibile a lavorare</h6>
                    <p className="m-0">Ruoli di {user.title}</p>
                    <p className="text-primary m-0">Vedi informazioni di contatto</p>
                </Col>
            </Col>
        </Col>
    )
}

export default CardProfile
