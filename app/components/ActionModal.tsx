import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useModal } from "../context/ModalContext";
import { DANGER_COLOR, PRIMARY_COLOR } from "../utils/constants";
import FadeInView from "./animation_providers/FadeInView";
import SlideUpView from "./animation_providers/SlideUpView";

type ActionModalProps = {
	show: boolean;
};

const ActionModal = ({ show }: ActionModalProps) => {
	const insets = useSafeAreaInsets();
	const { hideActionModal } = useModal();
	return (
		<>
			{show && (
				<FadeInView style={{ ...styles.overlay, paddingTop: insets.top }}>
					<Pressable
						style={styles.backdrop}
						onPress={hideActionModal}
					></Pressable>

					<SlideUpView delay={200}>
						<Text style={styles.title}>Actions</Text>
					</SlideUpView>

					<Animated.View
						style={{ gap: 16, marginTop: 16, flexDirection: "row" }}
					>
						<SlideUpView delay={300}>
							<Pressable
								style={({ pressed }) => [
									styles.actionDelete,
									{ opacity: pressed ? 0.5 : 1 },
								]}
							>
								<View>
									<Text style={styles.actionText}>Delete</Text>
								</View>
							</Pressable>
						</SlideUpView>
						<SlideUpView delay={500}>
							<Pressable
								style={({ pressed }) => [
									styles.actionUpdate,
									{ opacity: pressed ? 0.5 : 1 },
								]}
							>
								<View>
									<Text style={styles.actionText}>Update</Text>
								</View>
							</Pressable>
						</SlideUpView>
					</Animated.View>
				</FadeInView>
			)}
		</>
	);
};

export default ActionModal;

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.8)",
	},
	title: {
		fontFamily: "Archivo-Exp-Bold",
		color: "#fff",
		fontSize: 24,
	},
	actionDelete: {
		backgroundColor: DANGER_COLOR,
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
		width: "100%",
	},
	actionUpdate: {
		backgroundColor: PRIMARY_COLOR,
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
		width: "100%",
	},
	actionText: {
		color: "white",
		fontFamily: "Archivo-Bold",
		textAlign: "center",
	},
});
