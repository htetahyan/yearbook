import { useState } from "react";
interface UseModalHook {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useModal = (): UseModalHook => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    return {
        isOpen,
        openModal,
        closeModal

    }
}
