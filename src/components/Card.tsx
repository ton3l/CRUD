import { Button, Card as MUICard, CardActions, CardContent, TextField } from '@mui/material'
import { useState } from 'react'

interface CardProps {
    editCard: (key: number, value: string) => void,
    deleteCard: (key: number) => void,
    username: string,
    index: number
}

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
                            <TextField
                                value={username}
                                size="small"
                                fullWidth
                                slotProps={{ 
                                    input: { readOnly: true } 
                                }}
                            />
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
