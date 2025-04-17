import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextType = {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	toggleModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	const toggleModal = () => setIsOpen((prev) => !prev);

	return (
		<ModalContext.Provider
			value={{ isOpen, openModal, closeModal, toggleModal }}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};
