import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const HomeIcon = (props: SvgProps) => (
	<Svg
		width={props.width}
		height={props.height}
		viewBox="0 0 24 24" // 👈 super important for scaling & alignment
		fill="none"
		{...props}
	>
		<Path
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M5.5 12h-2l9-9 9 9h-2M5.5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"
		/>
		<Path
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9.5 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"
		/>
	</Svg>
);
export default HomeIcon;
