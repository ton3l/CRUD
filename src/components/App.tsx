import { Stack, Button  } from '@mui/material';
import styles from './App.module.css';
import { useState } from 'react'
import Modal from './ModalAdd';
import Card from './Card';

function App() {
    // Erro, quando estava tentando passar uma função para um setState ela estava sendo executada
    // Contexto é que eu estava tentando passar uma função callBack para o botão do modal, o modal não abria e a função era exeutada duas vezes
    const [cards, setCards] = useState< Array<string> >([]);
    const [ username, setUsername ] = useState<string>('');
    const [ open, setOpen ] = useState<boolean>(false);
    let keys = 0;

    function deleteCard(key: number) {
        const newCards = [...cards];
        newCards.splice(key, 1);
        setCards(newCards);
    }

    function editCard(key: number, value: string) {
        console.log(username)
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
