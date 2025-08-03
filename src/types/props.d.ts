export interface CardProps {
    editCard: (key: number, value: string) => void,
    deleteCard: (key: number) => void,
    username: string,
    index: number
}

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    username: string;
    setUsername: (username: string) => void;
    addCard: () => void;
}