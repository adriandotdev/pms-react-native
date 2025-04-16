import React from "react";
import {
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import logo from "../assets/img/app-logo-removebg-preview.png";

const Home = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<Image source={logo} style={{ width: 200, height: 200 }} />
				<Text style={styles.title}>Yan-Yan's Store</Text>
				<TouchableOpacity style={styles.loginButton}>
					<Text style={styles.loginButtonText}>Login</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.footerContainer}>
				<Text style={styles.footerText}>Developed by Adrian Marcelo</Text>
			</View>
		</SafeAreaView>
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
	},
	loginButton: {
		backgroundColor: "#11071B",
		width: 250,
		textAlign: "center",
		paddingVertical: 12,
		borderRadius: 8,
	},
	loginButtonText: {
		textAlign: "center",
		color: "#FBF9FD",
		fontFamily: "Archivo-Med",
		fontSize: 16,
	},
	footerContainer: {
		marginTop: "auto",
		paddingBottom: 16,
	},
	footerText: {
		fontFamily: "Archivo-SemiBold",
	},
});
