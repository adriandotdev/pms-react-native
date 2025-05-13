import { Platform, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useModal } from "../context/ModalContext";

type AlertProps = {
	show: boolean;
};

const Alert = ({ show }: AlertProps) => {
	const insets = useSafeAreaInsets();
	const { alert } = useModal();

	const computeTopPosition = () =>
		Platform.OS === "android" ? insets.top : insets.top - 40;

	return (
		<>
			{show && (
				<View style={{ ...styles.overlay, top: computeTopPosition() }}>
					<Animated.View
						style={styles.alert}
						entering={FadeInUp.duration(200).easing(Easing.ease)}
						exiting={FadeOutUp.duration(200).easing(Easing.ease)}
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
		position: "absolute",
		paddingTop: 48,
		left: 0,
		right: 0,
		zIndex: 30,
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
