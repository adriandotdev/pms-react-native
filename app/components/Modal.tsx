import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useModal } from "../context/ModalContext";
import Drawer from "./Drawer";

const Modal = ({ addModal }: { addModal: boolean }) => {
	const { toggleModal } = useModal();

	return addModal ? (
		<View style={styles.overlay}>
			<TouchableWithoutFeedback onPress={toggleModal}>
				<View style={styles.backdrop} />
			</TouchableWithoutFeedback>

			<Drawer open={addModal} style={{ ...styles.drawer }}>
				<Text style={styles.modalTitle}>New Product</Text>
			</Drawer>
		</View>
	) : (
		<></>
	);
};

export default Modal;

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		right: 0,
		bottom: 0,
		left: 0,
		top: 0,
		zIndex: 20,
	},
	backdrop: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(33,33,33,0.4)",
	},
	drawer: {
		paddingRight: 16,
		paddingLeft: 16,
		paddingBottom: 24,
		paddingTop: 24,
		justifyContent: "space-between",
		height: 316,

		borderTopRightRadius: 24,
		borderTopLeftRadius: 24,
	},
	modalTitle: {
		fontSize: 24,
		fontFamily: "Archivo-Exp-Bold",
		color: "#e8a123",
	},
});
