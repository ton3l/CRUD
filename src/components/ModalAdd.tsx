import { Modal as MUIModal, Paper, TextField, Stack, Button } from '@mui/material';
import type { ModalProps } from '../types/props';
import styles from './styles/App.module.css';

function Modal({ open, setOpen, username, setUsername, addCard }: ModalProps) {
    return (
        <MUIModal
            open={ open }
            onClose={ () => setOpen(false) }
        >
            <Paper sx={{ width: 400 }} id={styles.modal}>

                <Stack spacing={2} sx={{ height: 300, alignItems: 'center', justifyContent: 'center' }}>
                    <TextField 
                        label='Username' 
                        value={ username } 
                        onChange={ (e) => setUsername(e.target.value)} 
                    />
                    <Button 
                        variant='contained' 
                        onClick={ addCard }
                    >
                        Add
                    </Button>
                </Stack>

            </Paper>
        </MUIModal>
    )
}

export default Modal