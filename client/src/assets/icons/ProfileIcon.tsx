import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={18} height={21} fill="none" {...props}>
    <Path
      fill="#191919"
      d="M8.93 10.307A4.977 4.977 0 1 0 8.931.353a4.977 4.977 0 0 0 0 9.954Zm3.485 1.244h-.65a6.776 6.776 0 0 1-5.67 0h-.649A5.228 5.228 0 0 0 .22 16.778v1.617c0 1.031.836 1.867 1.866 1.867h13.688c1.03 0 1.867-.836 1.867-1.867v-1.617a5.228 5.228 0 0 0-5.226-5.227Z"
    />
  </Svg>
);
export default SvgComponent;
