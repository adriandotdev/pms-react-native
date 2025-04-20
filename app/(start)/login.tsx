import { useRouter } from "expo-router";
import {
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import FadeInView from "../components/animation_providers/FadeInView";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../utils/constants";

const LoginPage = () => {
	const router = useRouter();

	return (
		<FadeInView style={{ ...styles.container }}>
			<Text style={styles.loginTitle}>Yan-yan's Store</Text>

			<View style={{ gap: 24 }}>
				<View style={{ gap: 4 }}>
					<Text style={styles.inputLabel}>Username</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Enter your username here"
					/>
				</View>

				<View style={{ gap: 4 }}>
					<Text style={styles.inputLabel}>Password</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Enter your password here"
					/>
				</View>
			</View>
			<Pressable
				onPress={() => router.push("/dashboard")}
				style={({ pressed }) => [
					styles.buttonIdle,
					{
						backgroundColor: pressed ? "#111B07" : "#11071B",
						opacity: pressed ? 50 : 100,
					},
				]}
			>
				<Text style={styles.buttonText}>Sign In</Text>
			</Pressable>
		</FadeInView>
	);
};

export default LoginPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 24,
		width: "100%",
		gap: 5,
	},
	loginTitle: {
		fontFamily: "Archivo-Exp-Bold",
		fontSize: 32,
		color: "#201f1d",
		marginBottom: Platform.OS === "ios" ? 16 : 0,
		textAlign: "center",
	},
	inputLabel: {
		fontFamily: "Archivo-Med",
		fontSize: 16,
		color: PRIMARY_COLOR,
	},
	textInput: {
		height: 50,
		borderColor: SECONDARY_COLOR,
		borderWidth: 0.5,
		borderRadius: 8,
		fontFamily: "Archivo-Reg",
		paddingHorizontal: 10,
	},
	buttonIdle: {
		backgroundColor: "#201f1d",
		paddingHorizontal: 4,
		paddingVertical: 16,
		borderRadius: 8,
		marginTop: 16,
	},
	buttonText: {
		textAlign: "center",
		fontFamily: "Archivo-Med",
		fontSize: 16,
		color: "#f4e3ce",
	},
});
