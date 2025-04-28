import { create } from "zustand";

interface AuthStore {
	session: string;
	setSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	session: "",
	setSession: () => {
		set((state) => ({ session: state.session }));
	},
}));
