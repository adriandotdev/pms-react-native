import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../assets/img/app-logo-removebg-preview.png";

const Home = () => {
	const router = useRouter();
	return (
		<>
			<View style={styles.container}>
				<Image source={logo} style={{ width: 200, height: 200 }} />
				<View>
					<Text style={styles.title}>Yan-Yan's Store</Text>
				</View>
				<TouchableOpacity
					onPress={() => router.push("/login")}
					style={styles.loginButton}
				>
					<Text style={styles.loginButtonText}>Login</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.footerContainer}>
				<Text style={styles.footerText}>Developed by Adrian Marcelo</Text>
			</View>
		</>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 8,
		width: "100%",
		gap: 8,
	},
	title: {
		fontFamily: "Archivo-Exp-Bold",
		fontSize: 32,
		textAlign: "center",
		color: "#e8a123",
	},
	loginButton: {
		backgroundColor: "#201f1d",
		width: 250,
		textAlign: "center",
		paddingVertical: 12,
		borderRadius: 8,
	},
	loginButtonText: {
		textAlign: "center",
		color: "#f4e3ce",
		fontFamily: "Archivo-Med",
		fontSize: 16,
	},
	footerContainer: {
		marginTop: "auto",
		paddingBottom: 16,
		alignSelf: "center",
	},
	footerText: {
		fontFamily: "Archivo-SemiBold",
	},
});
