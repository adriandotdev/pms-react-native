import { useRouter } from "expo-router";
import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { ModalType, useModal } from "../context/ModalContext";
import { useAuthStore } from "../store";
import Drawer from "./Drawer";

const Sheet = ({ show, type }: { show: boolean; type?: ModalType }) => {
	const { hideSheet } = useModal();
	const setSession = useAuthStore((state) => state.setSession);
	const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
	const router = useRouter();

	const handleLogout = () => {
		setSession("");
		setRefreshToken("");
		hideSheet("logout");

		router.replace("/login");
	};

	const renderModalContent = () => {
		switch (type) {
			case "logout":
				return (
					<>
						<Text style={styles.logoutMessage}>
							Are you sure you want to logout?
						</Text>
						<View>
							<TouchableOpacity
								onPress={handleLogout}
								style={{ ...styles.buttonIdle, backgroundColor: "#B94F46" }}
							>
								<Text style={{ ...styles.buttonText, color: "white" }}>
									Logout
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => hideSheet("logout")}
								style={{ ...styles.buttonIdle, backgroundColor: "" }}
							>
								<Text style={styles.buttonText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</>
				);
		}
	};
	return (
		<>
			{show && (
				<View style={styles.overlay}>
					<TouchableWithoutFeedback onPress={() => hideSheet(type!)}>
						<View style={styles.backdrop} />
					</TouchableWithoutFeedback>

					<Drawer open={show} style={{ ...styles.drawer }}>
						{renderModalContent()}
					</Drawer>
				</View>
			)}
		</>
	);
};

export default Sheet;

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
		paddingBottom: Platform.OS === "ios" ? 40 : 24,
		paddingTop: 24,

		height: Platform.OS === "ios" ? 280 : 280,
		borderTopRightRadius: 24,
		borderTopLeftRadius: 24,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	logoutMessage: {
		fontFamily: "Archivo-Exp-Bold",
		fontSize: 18,
	},
	buttonIdle: {
		paddingHorizontal: 4,
		paddingVertical: 16,
		borderRadius: 8,
		marginTop: 16,
	},
	buttonText: {
		textAlign: "center",
		fontFamily: "Archivo-Med",
		fontSize: 16,
	},
});
