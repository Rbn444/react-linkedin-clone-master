import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import FormDialogModifyPost from './FormDialogModifyPost';
import { Link } from 'react-router-dom';
import AlertComponent from "../AlertComponent"

const ITEM_HEIGHT = 48;

export default function LongMenuPost(props) {
    //STATES
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [opeN, setOpeN] = useState(false)
    const [mess, setMess] = useState(' ')

    //REDUX
    const token = useSelector(state => state.user.token)
    const user = useSelector(state => state.user.user)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClicK = () => {
        setOpeN(true);
    };

    const deletePost = async () => { // fetch per eliminare un post
        const baseEndpoint = `https://striveschool-api.herokuapp.com/api/posts/${props.post._id}`
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
                props.fetchPosts()
            } else {
                setMess('Qualcosa è andato storto durante la richiesta')
                handleClicK()
            }
        } catch (error) {
            setMess('Errore del server' + error.message)
            handleClicK()
            console.log(error);
        }
    }

    // RENDER
    return (
        <div>
            <AlertComponent open={opeN} setOpen={setOpeN} mess={mess} />
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon
                    sx={{
                        transform: 'rotate(90deg)',
                    }} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <Link className='text-decoration-none' to={'/profili/' + props.post.user._id}>
                    <MenuItem onClick={handleClose}>
                        Visualizza Profilo
                    </MenuItem>
                </Link>
                {
                    props.post.user._id === user._id && (
                        <div>
                            <FormDialogModifyPost post={props.post} fetchPosts={props.fetchPosts} />
                            <MenuItem onClick={() => {
                                deletePost()
                                handleClose();
                            }
                            }>
                                Elimina
                            </MenuItem>
                        </div>
                    )
                }
            </Menu>
        </div>
    );
}
