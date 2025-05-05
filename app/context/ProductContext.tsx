import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";
import { useAuthStore } from "../store";

type ProductContextType = {
	fetchProducts: (pageNumber: number, search?: string) => void;
	products: Product[];
	page: number;
	loading: boolean;
	reset: () => void;
	loadMore: () => void;
	hasMore: boolean;
};

interface Category {
	id: number;
	name: string;
	description: string | null;
	createdAt: string;
	products: Product[];
}

interface Product {
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
	const [products, setProducts] = useState<Product[]>([]);
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
			let url = `https://accurately-factual-troll.ngrok-free.app/api/v1/products?pageNumber=${pageNumber}`;

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
				fetchProducts,
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
