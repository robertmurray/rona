import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  CustomTooltip,
  CustomizedAxisTick,
  CustomizedYAxisTick,
} from "./Customized";
import COLORS from "../../styles/colors";

const StateDeathComposed = ({ data }) => {
  return (
    <ComposedChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 5,
        bottom: 5,
      }}
    >
      <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
      <YAxis tick={<CustomizedYAxisTick />} />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <CartesianGrid stroke={COLORS.mediumgray} />
      <Area
        type="monotone"
        dataKey="deathThreeDayAverage"
        name="Three Day"
        stroke={COLORS.burgundy}
        fill={COLORS.burgundy}
      />
      <Bar
        dataKey="deathIncrease"
        name="Deaths"
        barSize={10}
        fill={COLORS.pink}
      />
    </ComposedChart>
  );
};

export default StateDeathComposed;
