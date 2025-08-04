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
        /* eslint-disable */
        setOpen(false);
        UserService.createUser(username)
        .then(() => {
            refreshCards();
        });
        /* eslint-enable */
        setUsername('');
    }
    
    
    const updateCard = (key: number, value: string) => {
        /* eslint-disable */
        UserService.updateUser(key, value)
        .then(() => {
            refreshCards();
        });
        /* eslint-enable */
        setUsername('');
    }
    
    const deleteCard = (key: number) => {
        /* eslint-disable */
        UserService.deleteUser(key)
        .then(() => {
            refreshCards();
        });
        /* eslint-enable */
    }

    return { createCard, updateCard, deleteCard, cards, refreshCards };
}
