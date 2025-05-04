import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import FadeInView from "../components/animation_providers/FadeInView";
import SlideUpView from "../components/animation_providers/SlideUpView";
import SettingsIcon from "../components/icons/SettingsIcon";
import { useAuthStore } from "../store";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../utils/constants";

const DashboardPage = () => {
	const router = useRouter();
	const session = useAuthStore((state) => state.session);

	useEffect(() => {
		if (!session) {
			router.replace("login");
		}
	}, []);

	return (
		<FadeInView style={styles.container}>
			<View style={styles.header}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
					<Text style={styles.title}>Dashboard</Text>
				</View>
				<SettingsIcon />
			</View>
			<View style={styles.cardContainer}>
				<SlideUpView delay={200} style={styles.dashboardCard}>
					<Text style={styles.cardH1}>28</Text>
					<Text style={styles.cardH2}>Categories</Text>
					<Text style={styles.cardDate}>as of April 2025</Text>
				</SlideUpView>
				<SlideUpView delay={350} style={styles.dashboardCard}>
					<View>
						<Text style={styles.cardH1}>207</Text>
						<Text style={styles.cardH2}>Products</Text>
						<Text style={styles.cardDate}>as of March 2025</Text>
					</View>
				</SlideUpView>

				<SlideUpView delay={400} style={styles.dashboardCard}>
					<Text style={styles.cardH1}>4</Text>
					<Text style={styles.cardH2}>Users</Text>
					<Text style={styles.cardDate}>as of April 2025</Text>
				</SlideUpView>
				<SlideUpView delay={450} style={styles.dashboardCard}>
					<Text style={styles.cardH1}>15k</Text>
					<Text style={styles.cardH2}>Sales</Text>
					<Text style={styles.cardDate}>as of March 2025</Text>
				</SlideUpView>
			</View>
		</FadeInView>
	);
};

export default DashboardPage;

const styles = StyleSheet.create({
	container: {
		paddingVertical: Platform.OS === "ios" ? 16 : 16,
		gap: 16,
		position: "relative",
		height: "100%",
		backgroundColor: "white",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		paddingBottom: 16,
		paddingHorizontal: 24,
	},
	title: {
		fontFamily: "Archivo-Exp-Bold",
		fontSize: 24,
		color: PRIMARY_COLOR,
		textAlign: "left",
	},
	cardContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between", // Makes spacing nice
		gap: 1, // Optional if supported
		paddingHorizontal: 24,
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
		color: PRIMARY_COLOR,
	},
	cardH2: {
		fontSize: 16,
		fontFamily: "Archivo-Bold",
		color: SECONDARY_COLOR,
	},
	cardDate: {
		marginTop: 16,
	},
});
