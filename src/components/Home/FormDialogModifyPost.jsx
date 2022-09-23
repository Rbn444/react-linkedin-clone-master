import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AlertComponent from "../AlertComponent"




export default function FormDialogModifyPost({ post, fetchPosts }) {
    //REDUX
    const token = useSelector(state => state.user.token)
    //----------------------------------------------------------------
    // STATES
    const [open, setOpen] = React.useState(false);
    const [opeN, setOpeN] = React.useState(false)
    const [mess, setMess] = React.useState(' ')
    const [postSingle, setPostSingle] = React.useState({
        text: post.text
    })
    //----------------------------------------------------------------

    //FUNZIONI
    const modifyPost = async (obj) => { // fetch per modificare il post
        const baseEndpoint = `https://striveschool-api.herokuapp.com/api/posts/${post._id}`

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
                fetchPosts()
                console.log(data);
            } else {
                setMess('Qualcosa è andato storto durante la modifica, riprovare grazie.')
                handleClick()
            }
        } catch (error) {
            setMess('Errore del server' + error.message)
            handleClick()
            console.log(error);
        }
    }

    const formValidation = () => { // ritorna true se il campo text è compilato
        let validation = false
        if (postSingle.text.length > 0) {
            validation = true
        }
        return validation
    }

    const handlePost = (key, value) => { // modifica l'oggetto postSingle
        setPostSingle(form => {
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
    //---------------------------------------------------------------

    // RENDER
    return (
        <div>
            <MenuItem onClick={handleClickOpen}>
                Modifica
            </MenuItem>
            <AlertComponent open={opeN} setOpen={setOpeN} mess={mess} />
            <Dialog open={open} onClose={handleClose}>
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
                        value={postSingle.text}
                        onChange={(e) => { handlePost('text', e.target.value); }}
                        fullWidth
                        variant="standard"
                        required
                    />
                </DialogContent>
                <DialogActions className='d-flex justify-content-between'>
                    <Button className='text-primary' onClick={() => {
                        handleClose()
                        setPostSingle({
                            text: post.text
                        })
                    }}>ANNULLA</Button>
                    <Button
                        className={formValidation() ? 'text-success' : 'text-secondary'}
                        disabled={!formValidation()}
                        onClick={() => {
                            handleClose()
                            modifyPost(postSingle)
                        }}>CONFERMA</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
