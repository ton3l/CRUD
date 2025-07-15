import { Button, Card as MUICard, CardActions, CardContent, TextField } from '@mui/material'
import { useState } from 'react'

interface CardProps {
    editCard: (key: number, value: string) => void,
    deleteCard: (key: number) => void,
    username: string,
    index: number,
    setUsername: (username: string) => void
}

function Card( { username, editCard, index, deleteCard, setUsername }: CardProps ) {
    //Neste erro o readonly, sendo ele true ou false, não habilita a edição do TextField
    const [ readOnly, setReadOnly ] = useState<boolean>(true);

    const handleEdit = () => {
        setReadOnly(!readOnly);
    };

    return (
        <>
            <MUICard variant="outlined">
                <CardContent>
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="small"
                        fullWidth
                        slotProps={{ 
                            input: { readOnly: readOnly } 
                        }}
                    />
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
