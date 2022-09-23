import { Button, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import FeedIcon from '@mui/icons-material/Feed';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BarChartIcon from '@mui/icons-material/BarChart';
import AlertComponent from "../AlertComponent"


export default function FormDialogPost({ fetchPosts }) {
    //REDUX
    const token = useSelector(state => state.user.token)
    const user = useSelector(state => state.user.user)

    //STATES
    const [open, setOpen] = useState(false);
    const [blobFile, setBlobFile] = useState(null)
    const [formObj, setFormObj] = useState({
        text: '',
    })
    const [opeN, setOpeN] = useState(false)
    const [mess, setMess] = useState(' ')

    // FUNZIONI
    const addPost = async (obj) => { // fetch per postare
        const baseEndpoint = "https://striveschool-api.herokuapp.com/api/posts/"

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
                setFormObj({
                    text: '',
                })
                fetchPosts()
                console.log(data);
            } else {
                setMess('Qualcosa è andato storto durante la modifica, riprovare grazie')
                handleClick()
            }
        } catch (error) {
            setMess('Errore del server' + error.message)
            handleClick()
            console.log(error);
        }
    }

    const handleForm = (key, value) => { // modifica l'oggetto form
        setFormObj(form => {
            return {
                ...form,
                [key]: value
            }

        })
    }

    const formValidation = () => { // true se text è compilato
        let validation = false
        if (formObj.text.length > 0) {
            validation = true
        }
        return validation
    }

    const handleClick = () => {
        setOpeN(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const fetchImg = async (postId) => { // modificare l'immagine del post
        const baseEndpoint = `https://striveschool-api.herokuapp.com/api/posts/${postId}`

        try {
            let formData = new FormData();
            formData.append('post', blobFile);
            const response = await fetch(baseEndpoint, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                fetchPosts()
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


    // RENDER
    return (
        <>
            <AlertComponent open={opeN} setOpen={setOpeN} mess={mess} />
            <Button
                onClick={handleClickOpen}
                variant="outline-secondary"
                className="buttonPost"
            >
                Avvia un Post
            </Button>
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <Col className="d-flex justify-content-between align-items-center">
                    <DialogTitle>Crea un post</DialogTitle>
                    <Button
                        className="buttonDialogPost"
                        variant="outline-secondary "
                        onClick={handleClose}
                    >
                        X
                    </Button>
                </Col>
                <hr />
                <DialogContent>
                    <Col xs={12} className="d-flex justify-content-start">
                        <img className="NavbarUserList" src={user.image} alt="" />
                        <div className="mb-3 ">
                            <h6>
                                {user.name} {user.surname}
                            </h6>
                            <Button className="CardAziendaButton" variant="outline-secondary">
                                Chiunque
                            </Button>
                        </div>
                    </Col>
                    <TextField
                        autoFocus
                        className="mt-3"
                        id="outlined-multiline-flexible"
                        label="Di cosa vorresti parlare"
                        multiline
                        rows={5}
                        value={formObj.text}
                        onChange={(e) => {
                            handleForm("text", e.target.value);
                        }}
                        fullWidth
                        variant="standard"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Col xs={10} className="d-flex justify-content-around">
                        <form encType="multipart/form-data" id='form'>
                            <label htmlFor="input"><ImageOutlinedIcon color={blobFile?.name.length > 0 ? 'primary' : '#86888A'} /></label>
                            <input
                                onChange={(e) => { setBlobFile(e.target.files[0]) }}
                                style={{ display: 'none' }} type="file" id="input" />
                        </form>
                        {/* <ImageOutlinedIcon sx={{ color: '#86888A' }} /> */}
                        <SmartDisplayIcon sx={{ color: '#86888A' }} />
                        <FeedIcon sx={{ color: '#86888A' }} />
                        <BusinessCenterIcon sx={{ color: '#86888A' }} />
                        <WorkspacePremiumIcon sx={{ color: '#86888A' }} />
                        <BarChartIcon sx={{ color: '#86888A' }} />
                    </Col>
                    <Col xs={2} >
                        <Button
                            className={!formValidation() ? "CardPostButton btn-primary text-secondary" : "CardPostButton btn-primary text-light"}
                            disabled={!formValidation()}
                            variant="outline-secondary"
                            onClick={() => {
                                if (formValidation() === true) {
                                    handleClose();
                                    addPost(formObj);
                                }
                            }}
                        >
                            Pubblica
                        </Button>
                    </Col>
                </DialogActions>
            </Dialog>
        </>

    );
}
