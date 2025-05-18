import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Platform,
	Pressable,
	Modal as RNModal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useModal } from "../context/ModalContext";
import { CreateProductType, useProduct } from "../context/ProductContext";
import { useAuthStore } from "../store";
import { PRIMARY_COLOR } from "../utils/constants";
import Drawer from "./Drawer";

type Category = {
	id: number;
	name: string;
	description: string;
	createdAt: string;
};

const AddProductModal = ({ addModal }: { addModal: boolean }) => {
	const session = useAuthStore((session) => session.session);
	const { toggleModal } = useModal();
	const { isOpen, showAlert, closeModal } = useModal();
	const {
		reset: resetProductField,
		fetchProducts,
		createProduct,
		productToUpdate,
		setProductToUpdate,
		updateProduct,
	} = useProduct();
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		resetField,
	} = useForm<CreateProductType>({
		defaultValues: {
			name: "",
			price: undefined,
			category: "banana",
		},
	});

	const onSubmit = async (data: CreateProductType) => {
		if (productToUpdate)
			await updateProductById.mutateAsync({ id: productToUpdate.id!, data });
		else await createNewProduct.mutateAsync(data);
	};

	const [open, setOpen] = useState(false);

	const [items, setItems] = useState([
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
	]);

	const { data, refetch: refetchCategories } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/api/v1/categories`,
				{
					headers: {
						Authorization: `Bearer ${session}`,
					},
				}
			);

			return response.data;
		},
	});

	const updateProductById = useMutation({
		mutationFn: async ({ id, data }: { id: number; data: CreateProductType }) =>
			updateProduct(id, data),
		onSuccess: () => {
			reset();
			refetchCategories();
			resetField("category", data?.categories[0].id);
			showAlert("Product updated successfuly!");
			resetProductField();
			fetchProducts(1, "");
			closeModal();
		},
	});

	const createNewProduct = useMutation({
		mutationFn: async (data: CreateProductType) => createProduct(data),
		onSuccess: () => {
			reset();
			refetchCategories();
			resetField("category", data?.categories[0].id);
			showAlert("Product created successfully!");
			resetProductField();
			fetchProducts(1, "");
		},
		onError: (error) => {
			console.error("Error creating product:", error);
		},
	});

	// When isOpen & data state changes
	useEffect(() => {
		setOpen(false);

		if (data?.categories) {
			console.log(data?.categories);

			setValue("category", data?.categories[0].id);
			setItems(
				data.categories.map((category: Category) => {
					return { label: category.name, value: category.id };
				})
			);
		}
	}, [isOpen, data]);

	// When productToUpdate state changes
	useEffect(() => {
		setValue("name", productToUpdate?.name!);
		setValue("price", Number(productToUpdate?.price));
		setValue("category", productToUpdate?.categoryId as unknown as string);
	}, [productToUpdate]);

	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);
	const [expirationDate, setExpirationDate] = useState("");

	const onChange = (event: any, selectedDate?: Date) => {
		if (Platform.OS === "android") {
			setShowPicker(false);
		}
		if (selectedDate) {
			setDate(selectedDate);
			setExpirationDate(selectedDate.toDateString());
		}
	};

	const openPicker = () => {
		setShowPicker(true);
	};

	return addModal ? (
		<View style={styles.overlay}>
			<TouchableWithoutFeedback
				onPress={() => {
					toggleModal();
					reset();
					setExpirationDate("");
					setProductToUpdate(undefined);
				}}
			>
				<View style={styles.backdrop} />
			</TouchableWithoutFeedback>

			<Drawer open={addModal} style={{ ...styles.drawer }}>
				<ScrollView style={{ paddingBottom: 24 }} nestedScrollEnabled={true}>
					<Text style={styles.modalTitle}>
						{productToUpdate ? "Update Product" : "New Product"}
					</Text>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Name</Text>
						<Controller
							control={control}
							rules={{ required: "Please provide a product name." }}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									autoCapitalize="none"
									placeholder="Ex. Coca-cola"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									style={{
										...styles.input,
										borderColor: errors.name ? "red" : "#e8a123",
									}}
								/>
							)}
							name="name"
						/>
						{errors.name && (
							<Text style={styles.errorMessage}>{errors.name.message}</Text>
						)}
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Price</Text>
						<Controller
							control={control}
							rules={{ required: "Please provide a product price." }}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									placeholder="Ex. 10"
									onBlur={onBlur}
									onChangeText={(text) => {
										const numericText = text.replace(/[^0-9]/g, "");
										onChange(numericText);
									}}
									value={String(value ? value : "")}
									style={{
										...styles.input,
										borderColor: errors.price ? "red" : "#e8a123",
									}}
									keyboardType="numeric"
								/>
							)}
							name="price"
						/>
						{errors.price && (
							<Text style={styles.errorMessage}>{errors.price.message}</Text>
						)}
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Category</Text>
						<Controller
							control={control}
							render={({ field: { value, onChange } }) => {
								return (
									<DropDownPicker
										open={open}
										value={value}
										items={items}
										setOpen={setOpen}
										onChangeValue={onChange}
										setValue={onChange}
										setItems={setItems}
										modalAnimationType="slide"
										listMode="MODAL"
										style={{
											borderColor: "#e8a123",
											borderWidth: 0.5,
											zIndex: 1000,
										}}
										dropDownContainerStyle={{
											borderColor: "#e8a123",
											borderWidth: 0.5,
											gap: 16,
											paddingBottom: 2,
											backgroundColor: "white",
											maxHeight: "auto",
											zIndex: 999,
										}}
										dropDownDirection="TOP"
									/>
								);
							}}
							name="category"
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Expiration Date</Text>
						<View>
							<TouchableOpacity style={styles.inputBox} onPress={openPicker}>
								<Text>
									{expirationDate
										? date.toDateString()
										: "Set the expiration date (optional)"}
								</Text>
							</TouchableOpacity>

							{/* Android: Show directly */}
							{showPicker && Platform.OS === "android" && (
								<DateTimePicker
									value={date}
									mode="date"
									display="default"
									onChange={onChange}
								/>
							)}

							{/* iOS: Use a modal */}
							{showPicker && Platform.OS === "ios" && (
								<RNModal transparent={true} animationType="slide">
									<View style={styles.modalContainer}>
										<View style={styles.pickerWrapper}>
											<DateTimePicker
												value={date}
												mode="date"
												display="spinner"
												onChange={onChange}
												style={{ backgroundColor: "white" }}
											/>
											<TouchableOpacity
												onPress={() => {
													setShowPicker(false);
													setExpirationDate(date.toDateString());
												}}
												style={styles.doneButton}
											>
												<Text style={{ color: "white" }}>Done</Text>
											</TouchableOpacity>
										</View>
									</View>
								</RNModal>
							)}
						</View>
					</View>
				</ScrollView>
				<Pressable
					disabled={createNewProduct.isPending}
					style={({ pressed }) => [
						styles.buttonIdle,
						{
							backgroundColor: pressed ? "#111B07" : "#11071B",
							opacity: pressed ? 50 : 100,
						},
					]}
					onPress={handleSubmit(onSubmit)}
				>
					{createNewProduct.isPending || updateProductById.isPending ? (
						<ActivityIndicator size={16} />
					) : (
						<Text style={styles.buttonText}>
							{productToUpdate ? "Update this product" : "Create"}
						</Text>
					)}
				</Pressable>
			</Drawer>
		</View>
	) : (
		<></>
	);
};

export default AddProductModal;

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

		height: Platform.OS === "ios" ? 500 : 550,
		borderTopRightRadius: 24,
		borderTopLeftRadius: 24,
	},
	modalTitle: {
		fontSize: 24,
		fontFamily: "Archivo-Exp-Bold",
		color: PRIMARY_COLOR,
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
	inputLabel: {
		marginTop: 16,
		gap: 4,
		fontFamily: "Archivo-Med",
		color: PRIMARY_COLOR,
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

	// IOS Date Modal Styles
	inputBox: {
		width: "100%",

		backgroundColor: "white",
		justifyContent: "center",
		borderWidth: 0.5,
		borderColor: "#e8a123",
		borderRadius: 8,
		alignItems: "center",
		paddingVertical: 16,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	pickerWrapper: {
		backgroundColor: "white",
		padding: 16,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		maxHeight: 320,
		height: "100%",
	},
	doneButton: {
		marginTop: 10,
		padding: 12,
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 8,
		alignItems: "center",
	},
});
