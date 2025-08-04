import { Stack, Button  } from '@mui/material';
import styles from './styles/App.module.css';
import { useState, useEffect } from 'react';
import UserService from '../services/User';
import type { User } from '../types/user';
import Modal from './Modal';
import Card from './Card';

function App() {
    const [ cards, setCards ] = useState<Array<User>>([]);
    const [ username, setUsername ] = useState<string>('');
    const [ open, setOpen ] = useState<boolean>(false);

    useEffect(() => { /* eslint-disable */
        UserService.getUsers() 
        .then(users => {
            setCards(users);
        })
        .catch(error => console.error('Error fetching users:', error));
    }, [cards])       /* eslint-enable */

    function deleteCard(key: number) {
        UserService.deleteUser(key);
        setCards([...cards]);
    }

    function editCard(key: number, value: string) {
        UserService.updateUser(key, value);
        setCards([...cards]);
        setUsername('');
    }

    function addCard() {
        setOpen(false);
        UserService.createUser(username);
        setCards([...cards]);        
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
                    cards.map((user: User) => 
                        <Card 
                            username={ user.name }
                            editCard={ editCard }
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
