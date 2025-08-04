import UserService from '../services/User';
import type { User } from '../types/user';
import { useState, useEffect } from 'react';

interface params {
    setOpen: (open: boolean) => void;
    username: string;
    setUsername: (username: string) => void;
}

export default function useCards({ setOpen, username, setUsername }: params) {
    const [cards, setCards] = useState<Array<User>>([]);
    
    const refreshCards = () => {
        /* eslint-disable */
        UserService.getUsers() 
        .then(users => {
            console.log('Users fetched:', users);
            setCards(users);
        })
        .catch(error => console.error('Error fetching users:', error));
        /* eslint-enable */
    }

    useEffect(() => {
        refreshCards();
    }, []);
    
    const createCard = () => {
        setOpen(false);
        UserService.createUser(username);
        /* eslint-disable */
        new Promise((resolve) => setTimeout(resolve, 300)) //Sem delay puxa dados antigos
        .then( () => refreshCards() )
        /* eslint-enable */
        setUsername('');
    }
    
    
    const updateCard = (key: number, value: string) => {
        UserService.updateUser(key, value);
        /* eslint-disable */
        new Promise((resolve) => setTimeout(resolve, 300)) //Sem delay puxa dados antigos
        .then( () => refreshCards() )
        /* eslint-enable */
        setUsername('');
    }
    
    const deleteCard = (key: number) => {
        UserService.deleteUser(key);
        /* eslint-disable */
        new Promise((resolve) => setTimeout(resolve, 300)) //Sem delay puxa dados antigos
        .then( () => refreshCards() )
        /* eslint-enable */
    }

    return { createCard, updateCard, deleteCard, cards, refreshCards };
}
