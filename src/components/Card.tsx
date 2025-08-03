import { Button, Card as MUICard, CardActions, CardContent, TextField, Typography } from '@mui/material'
import type { CardProps } from '../types/props';
import styles from './styles/Card.module.css';
import { useState } from 'react'

function Card( { username, editCard, index, deleteCard }: CardProps ) {
    const [ readOnly, setReadOnly ] = useState<boolean>(true);
    const [ tempUsername, setTempUsername ] = useState<string>(username);

    const handleEdit = () => {
        if (!readOnly) {
            editCard(index, tempUsername);
        }
        setReadOnly(!readOnly);
    };

    return (
        <>
            <MUICard variant="outlined">
                <CardContent>
                    {
                        readOnly ? (
                            <Typography variant="body1" component="div" id={styles.username}>
                                {username}
                            </Typography>
                        ) : (
                            <TextField
                                value={tempUsername}
                                onChange={(e) => setTempUsername(e.target.value)}
                                size="small"
                                fullWidth
                            />
                        )
                    }
                </CardContent>

                <CardActions>
                    <Button 
                        size="small" 
                        variant='contained' 
                        color='info'
                        onClick={handleEdit}
                    >
                        {readOnly ? 'Edit' : 'Save'}
                    </Button>

                    <Button 
                        size="small"
                        variant='contained'
                        color='error'
                        onClick={() => deleteCard(index)}
                    >
                        Delete
                    </Button>
                </CardActions>
            </MUICard>
        </>
    );
}

export default Card
