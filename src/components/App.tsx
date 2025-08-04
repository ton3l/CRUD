import { Stack, Button  } from '@mui/material';
import styles from './styles/App.module.css';
import { useState } from 'react';
import type { User } from '../types/user';
import Modal from './Modal';
import Card from './Card';
import useCards from '../hooks/useCards';

function App() {
    const [ username, setUsername ] = useState<string>('');
    const [ open, setOpen ] = useState<boolean>(false);
    const { createCard, updateCard, deleteCard, cards } = useCards({ setOpen, username, setUsername });

    return (
        <div id={styles.root}>
            <Button
                className={styles.fontColor}
                variant="contained"
                size="small"
                id={styles.add}
                onClick={ () => setOpen(true) }
                color='success'
            >
                +
            </Button>

            <Modal 
                open={ open }
                setOpen={setOpen}
                username={username} 
                setUsername={setUsername} 
                createCard={createCard}
            />

            <Stack spacing={2} >
                { 
                    cards.map((user: User) => 
                        <Card 
                            username={ user.name }
                            updateCard={ updateCard }
                            key={ user.id }
                            index={ user.id }
                            deleteCard={ deleteCard } 
                        />
                    )
                }
            </Stack>
        </div>
    );
}

export default App;
