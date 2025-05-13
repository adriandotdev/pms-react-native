import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { useAuthStore } from "../store";

export type CreateProductType = {
	name: string;
	category: string;
	price: number;
};

export type ProductContextType = {
	fetchProducts: (pageNumber: number, search?: string) => void;
	createProduct: (data: CreateProductType) => void;
	products: Product[];
	productToDelete?: Product;
	setProductToDelete: Dispatch<SetStateAction<Product | undefined>>;
	removeProduct: () => void;
	page: number;
	loading: boolean;
	reset: () => void;
	loadMore: () => void;
	hasMore: boolean;
};

export interface Category {
	id: number;
	name: string;
	description: string | null;
	createdAt: string;
	products: Product[];
}

export interface Product {
	id: number;
	name: string;
	price: number;
	categoryId: number;
	category: Category;
	createdAt: string;
	description: string | null;
	expirationDate: string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
	// List of products
	const [products, setProducts] = useState<Product[]>([]);
	const [productToDelete, setProductToDelete] = useState<Product>();

	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const session = useAuthStore((state) => state.session);
	const setSession = useAuthStore((state) => state.setSession);
	const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
	const router = useRouter();

	const fetchProducts = async (pageNumber: number, search?: string) => {
		setLoading(true);
		try {
			let url = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/products?pageNumber=${pageNumber}`;

			if (search) url += `&filter=${search}`;
			// @TODO It must be in environment variables
			console.log("url", url);

			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${session}`,
				},
			});

			const newProducts = response.data.products;

			if (newProducts.length === 0) {
				setHasMore(false);
			} else {
				setProducts((prev) => {
					const existingIds = new Set(prev.map((p) => p.id));
					const filtered = newProducts.filter(
						(p: Product) => !existingIds.has(p.id)
					);
					return pageNumber === 1 ? newProducts : [...prev, ...filtered];
				});
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					setSession("");
					setRefreshToken("");
					router.replace("/login");
				}
			}
		}
		setLoading(false);
	};

	const createProduct = async (data: CreateProductType) => {
		try {
			await axios.post(
				`${process.env.EXPO_PUBLIC_API_URL}/api/v1/products`,
				{
					Name: data.name,
					Price: data.price,
					CategoryId: data.category,
				},
				{
					headers: {
						Authorization: `Bearer ${session}`,
					},
				}
			);
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					setSession("");
					setRefreshToken("");
					router.replace("/login");
				}
			}
		}
	};

	const removeProduct = async () => {
		try {
			await axios.delete(
				`${process.env.EXPO_PUBLIC_API_URL}/api/v1/products/${productToDelete?.id}`,
				{
					headers: {
						Authorization: `Bearer ${session}`,
					},
				}
			);
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					console.log("rerror removing in remove product axios");
					setSession("");
					setRefreshToken("");
					router.replace("/login");
				}
			}
		}
	};
	const reset = () => {
		setPage(1);
		setHasMore(true);
		setProducts([]);
	};

	const loadMore = () => {
		if (!loading && hasMore) {
			setPage((prev) => prev + 1);
		}
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				productToDelete,
				setProductToDelete,
				removeProduct,
				fetchProducts,
				createProduct,
				reset,
				loadMore,
				page,
				loading,
				hasMore,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductProvider;

export const useProduct = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error("useProduct must be used within a ProductProvider");
	}
	return context;
};
