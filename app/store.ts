import { create } from "zustand";

interface AuthStore {
	session: string;
	setSession: (newSession: string) => void;
	refreshToken: string;
	setRefreshToken: (refreshToken: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	session: "",
	setSession: (newSession) => {
		set(() => ({ session: newSession }));
	},
	refreshToken: "",
	setRefreshToken: (refreshToken) => {
		set(() => ({ refreshToken }));
	},
}));
