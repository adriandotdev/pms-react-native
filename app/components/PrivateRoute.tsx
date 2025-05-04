import { useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "../store";

type PrivateRouteProps = {
	children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const router = useRouter();
	const session = useAuthStore((state) => state.session);
	const segments = useSegments();

	useEffect(() => {
		console.log("useEffect private route run");
		console.log("session value: ", session);

		if (!session) return router.replace("/login");
	}, [segments]);

	return children;
};

export default PrivateRoute;
