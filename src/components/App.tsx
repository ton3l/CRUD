import { Stack, Button  } from '@mui/material';
import styles from './styles/App.module.css';
import { useState, useEffect } from 'react'
import Modal from './ModalAdd';
import Card from './Card';

function App() {
    const usersUrl = import.meta.env.VITE_API_URL + 'usernames';
    const [ cards, setCards ] = useState<Array<string>>([]);
    const [ username, setUsername ] = useState<string>('');
    const [ open, setOpen ] = useState<boolean>(false);

    useEffect(() => {
        fetch(usersUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        /* eslint-disable */
        .then(response => response.json())
        .then(users => {
            const usernames = users.map((user: {name: string}) => user.name);
            setCards(usernames);
        })
        .catch(error => console.error('Error fetching users:', error));
    }, [])
    /* eslint-enable */

    let keys = 0;

    function deleteCard(key: number) {
        const newCards = [...cards];
        newCards.splice(key);
        setCards(newCards);
    }

    function editCard(key: number, value: string) {
        const newCards = [...cards];
        newCards[key] = value;
        setCards(newCards);
        setUsername('');
    }

    function addCard() {
        setOpen(false);
        setCards([ ...cards, username ]);
        setUsername('');
    }
    
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
                addCard={addCard}
            />

            <Stack spacing={2} >
                { 
                    cards.map((username: string) => 
                        <Card 
                            username={ username }
                            editCard={ editCard }
                            key={ keys++ }
                            index={ keys }
                            deleteCard={ deleteCard } 
                        />
                    )
                }
            </Stack>
        </div>
    );
}

export default App;
