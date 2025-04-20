import { StyleSheet, Text, View } from "react-native";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useModal } from "../context/ModalContext";

type AlertProps = {
	show: boolean;
};

const Alert = ({ show }: AlertProps) => {
	const insets = useSafeAreaInsets();
	const { alert } = useModal();

	return (
		<>
			{show && (
				<View style={{ ...styles.overlay, top: insets.top }}>
					<Animated.View
						style={styles.alert}
						entering={SlideInUp}
						exiting={SlideOutUp}
					>
						<Text style={styles.alertMessage}>{alert.message}</Text>
					</Animated.View>
				</View>
			)}
		</>
	);
};

export default Alert;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		// backgroundColor: "rgba(0,0,0,0.5)",
		position: "absolute",
		paddingTop: 48,

		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 100,
	},
	alert: {
		zIndex: 100,
		backgroundColor: "#23E8A1",
		padding: 16,
		borderRadius: 8,
		width: "80%",
		borderTopRightRadius: 24,
		borderTopLeftRadius: 24,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,

		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	alertMessage: {
		fontFamily: "Archivo-Med",
		fontSize: 14,
		textAlign: "center",
	},
});
