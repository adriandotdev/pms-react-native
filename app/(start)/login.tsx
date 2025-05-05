import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import FadeInView from "../components/animation_providers/FadeInView";
import { useAuthStore } from "../store";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../utils/constants";

type FormValues = {
	username: string;
	password: string;
};

const LoginPage = () => {
	const router = useRouter();

	const session = useAuthStore((state) => state.session);
	const setSession = useAuthStore((state) => state.setSession);
	const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

	const [error, setError] = useState("");

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		reset,
		resetField,
	} = useForm<FormValues>({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			const response = await axios.post(
				"https://accurately-factual-troll.ngrok-free.app/api/v1/auth/login",
				{ username: data.username, password: data.password }
			);
			setSession(response.data.accessToken);
			setRefreshToken(response.data.refreshToken);
			router.push("/dashboard");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 404 || error.response?.status === 401) {
					setError("Invalid credentials");
				}
			} else {
				setError((error as Error).message);
			}
		}
	};

	useEffect(() => {
		if (session) return router.replace("/dashboard");
	}, []);

	return (
		<FadeInView style={{ ...styles.container }}>
			<Text style={styles.loginTitle}>Yan-yan's Store</Text>

			<View style={{ gap: 24 }}>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Username</Text>
					<Controller
						control={control}
						rules={{ required: "Please provide your username." }}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								autoCapitalize="none"
								placeholder="Enter your usernane here"
								onBlur={onBlur}
								onChangeText={(text) => {
									onChange(text);
									setError("");
								}}
								value={value as unknown as string}
								style={{
									...styles.input,
									borderColor: errors.username ? "red" : "#e8a123",
								}}
							/>
						)}
						name="username"
					/>
					{errors.username && (
						<Text style={styles.errorMessage}>{errors.username.message}</Text>
					)}
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Password</Text>
					<Controller
						control={control}
						rules={{ required: "Please provide your password." }}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								autoCapitalize="none"
								placeholder="Enter your password here"
								onBlur={onBlur}
								onChangeText={(text) => {
									onChange(text);
									setError("");
								}}
								value={value as unknown as string}
								style={{
									...styles.input,
									borderColor: errors.password ? "red" : "#e8a123",
								}}
								secureTextEntry={true}
							/>
						)}
						name="password"
					/>
					{errors.password && (
						<Text style={styles.errorMessage}>{errors.password.message}</Text>
					)}
				</View>
			</View>
			<Pressable
				disabled={isSubmitting}
				onPress={handleSubmit(onSubmit)}
				style={({ pressed }) => [
					styles.buttonIdle,
					{
						backgroundColor: pressed ? "#111B07" : "#11071B",
						opacity: pressed ? 50 : 100,
					},
				]}
			>
				{isSubmitting ? (
					<ActivityIndicator size={16} />
				) : (
					<Text style={styles.buttonText}>Sign In</Text>
				)}
			</Pressable>
			{error && (
				<View
					style={{
						backgroundColor: "#B94F46",
						justifyContent: "center",
						alignItems: "center",
						padding: 20,
						marginTop: 20,
						borderRadius: 8,
					}}
				>
					<Text style={{ color: "white", fontFamily: "Archivo-Bold" }}>
						{error}
					</Text>
				</View>
			)}
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
	inputContainer: {
		gap: 4,
	},
	input: {
		height: 50,
		borderWidth: 0.5,
		borderRadius: 4,
		fontFamily: "Archivo-Reg",
		paddingHorizontal: 10,
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
	errorMessage: {
		color: "red",
		fontFamily: "Archivo-Reg",
		marginTop: 8,
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
