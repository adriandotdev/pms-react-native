import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextType = {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	toggleModal: () => void;
	alert: { show: boolean; message: string };
	showAlert: (message: string) => void;
	hideAlert: () => void;
	showActionModal: () => void;
	hideActionModal: () => void;
	actionModal: boolean;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	const toggleModal = () => setIsOpen((prev) => !prev);

	const [alert, setAlert] = useState({
		show: false,
		message: "",
	});

	const [actionModal, setActionModal] = useState(false);

	const showAlert = (message: string) => {
		setAlert({ show: true, message });
		setTimeout(() => {
			hideAlert();
		}, 3000);
	};

	const hideAlert = () => {
		setAlert({ show: false, message: "" });
	};

	const showActionModal = () => {
		setActionModal(true);
	};

	const hideActionModal = () => {
		setActionModal(false);
	};

	return (
		<ModalContext.Provider
			value={{
				isOpen,
				openModal,
				closeModal,
				toggleModal,
				alert,
				showAlert,
				hideAlert,
				showActionModal,
				hideActionModal,
				actionModal,
			}}
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

export default ModalProvider;
