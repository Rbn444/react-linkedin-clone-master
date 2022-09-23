import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Col } from 'react-bootstrap';
import { BiPlus, BiPencil } from 'react-icons/bi'
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';



export default function FormDialogCompetenze(props) {
    //REDUX
    const user = useSelector(state => state.user.user)
    // ----------------------------------------------------------------

    const location = useLocation() // navigazione

    // STATES 
    const [open, setOpen] = useState(false);
    const [formObj, setFormObj] = useState(user)
    //----------------------------------------------------------------

    // USE EFFECT 
    useEffect(() => {
        setFormObj(user)
    }, [user])
    //----------------------------------------------------------------

    //FUNZIONI
    const formValidation = () => { // ritorna true se tutti i campi sono compilati
        let validation = false
        if (props.experienceObj.description.length > 0 &&
            props.experienceObj.area.length > 0 &&
            props.experienceObj.role.length > 0 &&
            props.experienceObj.company.length > 0 &&
            props.experienceObj.startDate.length > 0 &&
            props.experienceObj.endDate.length > 0) {
            validation = true
        }
        return validation
    }

    const handleExperience = (key, value) => {// setta l'oggetto del form
        props.setExperienceObj(form => {
            return {
                ...form,
                [key]: value
            }

        })
    }

    const handleClickOpen = () => { // apre il dialog 
        setOpen(true);
    };

    const handleClose = () => { // chiude il dialog
        setOpen(false);
    };


    return (
        <Col xs={12} className='d-flex justify-content-between align-items-center text-end mb-2'>
            <Col xs={4}>
                <h4>Competenze</h4>
            </Col>
            <Col xs={3}
                className='CardProfilePencil text-secondary d-flex justify-content-between align-items-center'>
                <BiPlus onClick={handleClickOpen} />
                <Col xs={3}>
                    {
                        location.pathname === '/profile' ? (
                            <Link to='/modify'>
                                <BiPencil className="CardProfilePencil text-secondary " />
                            </Link>
                        ) : (
                            <BiPencil
                                onClick={() => {
                                    props.setDeleteToggle(!props.deleteToggle)
                                }}
                                className={!props.deleteToggle ? "CardProfilePencil text-secondary " : "CardProfilePencil text-danger "} />
                        )
                    }
                </Col>
            </Col>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>COMPETENZE</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Raccontaci le tue esperienze lavorative
                    </DialogContentText>
                    <TextField
                        autoFocus
                        className='mt-3'
                        id="outlined-multiline-flexible"
                        label="Mansione svolta"
                        multiline
                        rows={5}
                        value={props.experienceObj.description}
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
                        value={props.experienceObj.area}
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
                        value={props.experienceObj.role}
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
                        value={props.experienceObj.company}
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
                        value={props.experienceObj.startDate}
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
                        value={props.experienceObj.endDate}
                        onChange={(e) => { handleExperience('endDate', e.target.value); }}
                        fullWidth
                        variant="standard"
                        required
                    />
                </DialogContent>
                <DialogActions className='justify-content-evenly'>
                    <Col xs={5}>
                        <form encType="multipart/form-data" id='form'>
                            <label htmlFor="inputComp"><ImageOutlinedIcon color={props.blobFile?.name.length > 0 ? 'primary' : '#86888A'} /></label>
                            <input
                                onChange={(e) => {
                                    props.setBlobFile(e.target.files[0])

                                }}
                                style={{ display: 'none' }} type="file" id="inputComp" />
                        </form>
                    </Col>
                    <Button onClick={handleClose}>ANNULLA</Button>
                    <Button
                        disabled={!formValidation()}
                        onClick={() => {
                            if (formValidation() === true) {
                                handleClose()
                                props.addExperience(props.experienceObj)
                            }

                        }}>CONFERMA</Button>
                </DialogActions>
            </Dialog>
        </Col>
    );
}
