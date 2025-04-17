import Svg, { Rect, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
	focused: boolean;
	activeColor: string;
	size: number;
}

const DashboardIcon = (props: IconProps) => {
	return (
		<Svg
			width={props.width}
			height={props.height}
			viewBox="0 0 11 10"
			fill="none"
		>
			<Rect
				y="9"
				width="11"
				height="1"
				rx="0.4"
				fill={props.focused ? props.activeColor : props.color}
			/>
			<Rect
				y="10"
				width="10"
				height="1"
				rx="0.5"
				transform="rotate(-90 0 10)"
				fill={props.focused ? props.activeColor : props.color}
			/>
			<Rect
				x="2"
				y="9"
				width="4"
				height="2"
				transform="rotate(-90 2 9)"
				fill={props.focused ? props.activeColor : props.color}
			/>
			<Rect
				x="5"
				y="9"
				width="7"
				height="2"
				transform="rotate(-90 5 9)"
				fill={props.focused ? props.activeColor : props.color}
			/>
			<Rect
				x="8"
				y="9"
				width="9"
				height="2"
				transform="rotate(-90 8 9)"
				fill={props.focused ? props.activeColor : props.color}
			/>
		</Svg>
	);
};

export default DashboardIcon;
