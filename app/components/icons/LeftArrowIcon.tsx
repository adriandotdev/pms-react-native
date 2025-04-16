import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const LeftArrowIcon = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<Path
			fill={props.fill ? props.fill : "#323945"}
			d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414L7.828 11Z"
		/>
	</Svg>
);
export default LeftArrowIcon;
