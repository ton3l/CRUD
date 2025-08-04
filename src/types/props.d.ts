export interface CardProps {
    updateCard: (key: number, value: string) => void;
    deleteCard: (key: number) => void;
    username: string;
    index: number;
}

export interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    username: string;
    setUsername: (username: string) => void;
    createCard: () => void;
}
