import { useRouter } from "expo-router";
import React from "react";
import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import FadeInView from "../components/animation_providers/FadeInView";
import LeftArrowIcon from "../components/icons/LeftArrowIcon";
import SettingsIcon from "../components/icons/SettingsIcon";

const DashboardPage = () => {
	const router = useRouter();

	return (
		<FadeInView style={{ ...styles.container }}>
			<View style={styles.header}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
					<LeftArrowIcon onPress={() => router.back()} />
					<Text style={styles.title}>Dashboard</Text>
				</View>
				<SettingsIcon />
			</View>
			<View style={styles.cardContainer}>
				<View style={styles.dashboardCard}>
					<Text style={styles.cardH1}>28</Text>
					<Text style={styles.cardH2}>Categories</Text>
					<Text style={styles.cardDate}>as of April 2025</Text>
				</View>
				<TouchableOpacity
					onPress={() => router.push("/dashboard/products/")}
					style={styles.dashboardCard}
				>
					<View>
						<Text style={styles.cardH1}>207</Text>
						<Text style={styles.cardH2}>Products</Text>
						<Text style={styles.cardDate}>as of March 2025</Text>
					</View>
				</TouchableOpacity>

				<View style={styles.dashboardCard}>
					<Text style={styles.cardH1}>4</Text>
					<Text style={styles.cardH2}>Users</Text>
					<Text style={styles.cardDate}>as of April 2025</Text>
				</View>
				<View style={styles.dashboardCard}>
					<Text style={styles.cardH1}>15k</Text>
					<Text style={styles.cardH2}>Sales</Text>
					<Text style={styles.cardDate}>as of March 2025</Text>
				</View>
			</View>
			<View></View>
		</FadeInView>
	);
};

export default DashboardPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingHorizontal: 24,
		width: "100%",
		paddingVertical: Platform.OS === "ios" ? 0 : 48,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,
	},
	title: {
		fontFamily: "Archivo-Exp-Bold",
		fontSize: 24,
		color: "#e8a123",
		textAlign: "left",
	},
	cardContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between", // Makes spacing nice
		gap: 1, // Optional if supported
		marginTop: 16,
	},
	dashboardCard: {
		backgroundColor: "#ffffff",
		paddingTop: 16,
		paddingHorizontal: 14,
		paddingBottom: 16,

		flexDirection: "column",
		alignItems: "flex-start",
		borderRadius: 8,
		borderColor: "#f4e3ce",
		borderWidth: 1,
		width: "48%",
		aspectRatio: 1,
		marginTop: 16,
	},

	cardH1: {
		fontSize: 48,
		fontFamily: "Archivo-Exp-Bold",
		textAlign: "left",
		color: "#e8a123",
	},
	cardH2: {
		fontSize: 16,
		fontFamily: "Archivo-Med",
	},
	cardDate: {
		marginTop: 16,
	},
});
