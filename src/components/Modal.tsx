import { Modal as MUIModal, Paper, TextField, Stack, Button } from '@mui/material';
import type { ModalProps } from '../types/props';
import styles from './styles/Modal.module.css';

function Modal({ open, setOpen, username, setUsername, createCard }: ModalProps) {
    return (
        <MUIModal
            open={ open }
            onClose={ () => setOpen(false) }
        >
            <Paper sx={{ width: 400 }} id={styles.paper}>

                <Stack spacing={2} sx={{ height: 300, alignItems: 'center', justifyContent: 'center' }}>
                    <TextField 
                        label='Username' 
                        value={ username } 
                        onChange={ (e) => setUsername(e.target.value)} 
                    />
                    <Button 
                        variant='contained' 
                        onClick={ createCard }
                    >
                        Add
                    </Button>
                </Stack>

            </Paper>
        </MUIModal>
    )
}

export default Modal