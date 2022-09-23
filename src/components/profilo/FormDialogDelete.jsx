import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import FormDialogModify from './FormDialogModify';
import AlertComponent from "../AlertComponent"



export default function FormDialogDelete({ experience, fetchExperiences, deleteToggle }) {
    // REDUX
    const user = useSelector(state => state.user.user)
    const token = useSelector(state => state.user.token)
    //----

    //STATES
    const [open, setOpen] = React.useState(false);
    const [opeN, setOpeN] = React.useState(false)
    const [mess, setMess] = React.useState(' ')
    //----------------------------------------------------------------

    // FUNZIONI
    const deleteExperience = async () => { // fetch che elimina una experience
        const baseEndpoint = `https://striveschool-api.herokuapp.com/api/profile/${user._id}/experiences/${experience._id}`
        const header = {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await fetch(baseEndpoint, {
                method: "DELETE",
                headers: header,
            });
            if (response.ok) {
                fetchExperiences()
            } else {
                setMess('Qualcosa è andato storto durante l\'eliminazione')
                handleClick()
            }
        } catch (error) {
            setMess('Errore del server' + error.message)
            handleClick()
            console.log(error);
        }
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
    //-----

    // RENDER
    return (
        <Col xs={12} className='d-flex justify-content-end text-end p-3'>
            <AlertComponent open={opeN} setOpen={setOpeN} mess={mess} />
            {
                deleteToggle && (
                    <Col xs={3}

                        className='CardProfilePencil text-danger d-flex justify-content-between'>
                        <Col
                            onClick={handleClickOpen}
                            xs={3}>
                            <ClearIcon className='me-3' />
                        </Col>
                        <Col xs={3}>
                            <FormDialogModify
                                experience={experience}
                                fetchExperiences={fetchExperiences}
                                deleteToggle={deleteToggle}
                            />
                        </Col>
                    </Col>
                )
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className='text-danger text-center'>ATTENZIONE</DialogTitle>
                <DialogContent>
                    <DialogContentText className='text-center'>
                        Questa azione è irreversibile <br />
                        Sei sicuro?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='d-flex justify-content-between'>
                    <Button className='text-success' onClick={handleClose}>NO, ANNULLA</Button>
                    <Button
                        className='text-danger'
                        onClick={() => {
                            handleClose()
                            deleteExperience();
                        }}>SI, CONFERMA</Button>
                </DialogActions>
            </Dialog>
        </Col>
    );
}
