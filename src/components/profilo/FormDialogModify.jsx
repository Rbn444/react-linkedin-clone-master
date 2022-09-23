import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { BiPencil } from 'react-icons/bi'
import TextField from '@mui/material/TextField';
import { Col } from 'react-bootstrap'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AlertComponent from "../AlertComponent"




export default function FormDialogModify({ experience, fetchExperiences, deleteToggle }) {
    //REDUX
    const user = useSelector(state => state.user.user)
    const token = useSelector(state => state.user.token)
    //----

    //STATES
    const [open, setOpen] = React.useState(false);
    const [experienceSingle, setExperienceSingle] = React.useState(experience)
    const [blobFile, setBlobFile] = React.useState(null)
    const [opeN, setOpeN] = React.useState(false)
    const [mess, setMess] = React.useState(' ')
    //----------------------------------------------------------------

    //FUNZIONI
    const formValidation = () => { // ritorna true se tutti i campi del form sono compilati
        let validation = false
        if (experienceSingle.description.length > 0 &&
            experienceSingle.area.length > 0 &&
            experienceSingle.role.length > 0 &&
            experienceSingle.company.length > 0 &&
            experienceSingle.startDate.length > 0 &&
            experienceSingle.endDate.length > 0) {
            validation = true
        }
        return validation
    }

    const modifyExperience = async (obj) => { // fetch che modifica l'oggetto experience
        const baseEndpoint = "https://striveschool-api.herokuapp.com/api/profile/" + user._id + "/experiences/" + experience._id

        const header = {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await fetch(baseEndpoint, {
                method: "PUT",
                body: JSON.stringify(obj),
                headers: header,
            });
            if (response.ok) {
                const data = await response.json();
                fetchExperiences()
                fetchImg(data._id)
            } else {
                alert("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchImg = async (expId) => { // fetch per modificare di un'experience
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
                setMess('Qualcosa è andato storto durante la modifca, riprovare grazie')
                handleClick()
            }
        } catch (error) {
            setMess('Errore del server' + error.message)
            handleClick()
            console.log(error);
        }
    }

    const handleExperience = (key, value) => { // setta l'oggetto experience
        setExperienceSingle(form => {
            return {
                ...form,
                [key]: value
            }

        })
    }

    const handleClick = () => { // apre l'alert
        setOpeN(true);
    };

    const handleClickOpen = () => { // apre il dialog
        setOpen(true);
    };

    const handleClose = () => { // chiude il dialog
        setOpen(false);
    };
    //----------------------------------------------------------------

    //RENDER
    return (
        <>
            {
                deleteToggle && (
                    <BiPencil
                        className='text-primary'
                        onClick={handleClickOpen} />
                )
            }

            <Dialog open={open} onClose={handleClose}>
                <AlertComponent open={opeN} setOpen={setOpeN} mess={mess} />
                <DialogTitle className='text-dark text-center'>MODIFICA COMPETENZA</DialogTitle>
                <DialogContent>
                    <DialogContentText className='text-center'>
                        Modifica i campi e premi su conferma, annullando verranno ripristinati i campi precedenti
                    </DialogContentText>
                    <TextField
                        autoFocus
                        className='mt-3'
                        id="outlined-multiline-flexible"
                        label="Mansione svolta"
                        multiline
                        rows={5}
                        value={experienceSingle.description}
                        onChange={(e) => { handleExperience('description', e.target.value); }}
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Località in cui lavori o hai lavorato"
                        type="text"
                        value={experienceSingle.area}
                        onChange={(e) => { handleExperience('area', e.target.value); }}
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Ruolo ricoperto"
                        type="email"
                        value={experienceSingle.role}
                        onChange={(e) => { handleExperience('role', e.target.value); }}
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Azienda per cui lavori o hai lavorato"
                        type="text"
                        value={experienceSingle.company}
                        onChange={(e) => { handleExperience('company', e.target.value); }}
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        className='mt-4'
                        id="outlined-helperText"
                        helperText="INIZIO"
                        type="date"
                        value={experienceSingle.startDate.substring(0, 10)}
                        onChange={(e) => { handleExperience('startDate', e.target.value); }}
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        className='mt-4'
                        id="outlined-helperText"
                        helperText="FINE"
                        type="date"
                        value={experienceSingle.endDate.substring(0, 10)}
                        onChange={(e) => { handleExperience('endDate', e.target.value); }}
                        fullWidth
                        variant="standard"
                        required
                    />
                </DialogContent>
                <DialogActions className='d-flex justify-content-between p-4'>
                    <Col xs={5}>
                        <form encType="multipart/form-data" id='form'>
                            <label htmlFor="inputMod"><ImageOutlinedIcon color={blobFile?.name.length > 0 ? 'primary' : '#86888A'} /></label>
                            <input
                                onChange={(e) => {
                                    setBlobFile(e.target.files[0])

                                }}
                                style={{ display: 'none' }} type="file" id="inputMod" />
                        </form>
                    </Col>
                    <Button className='text-primary' onClick={() => {
                        handleClose()
                        setExperienceSingle(experience)
                    }}>ANNULLA</Button>
                    <Button
                        disabled={formValidation()}
                        className={formValidation() ? 'text-success' : 'text-secondary'}
                        onClick={() => {
                            handleClose()
                            modifyExperience(experienceSingle);
                        }}>CONFERMA</Button>
                </DialogActions>
            </Dialog>
        </>

    );
}
