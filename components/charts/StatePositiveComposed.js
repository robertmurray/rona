import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  CustomTooltip,
  CustomizedAxisTick,
  CustomizedYAxisTick,
} from "./Customized";
import COLORS from "../../styles/colors";

const StatePositiveComposed = ({ data }) => {
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
      <Area
        type="monotone"
        dataKey="casesThreeDayAverage"
        name="Three Day"
        stroke={COLORS.mediumgray}
        fill={COLORS.mediumgray}
      />
      <Bar
        dataKey="positiveIncrease"
        name="Cases"
        barSize={10}
        fill={COLORS.teal}
      />
    </ComposedChart>
  );
};

export default StatePositiveComposed;
