import {
  Area,
  AreaChart,
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

const StateTotals = ({ data }) => {
  return (
    <AreaChart
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
      <CartesianGrid stroke={COLORS.mediumgray} />
      <XAxis
        dataKey="date"
        fontFamily={"Roboto, sans-serif"}
        tick={<CustomizedAxisTick />}
      />
      <YAxis tick={<CustomizedYAxisTick />} />
      <Tooltip content={<CustomTooltip />} />
      <Legend iconType="circle" />

      <Area
        type="monotone"
        dataKey="death"
        name="Deaths"
        stackId="1"
        stroke={COLORS.mediumburgundy}
        fill={COLORS.pink}
      />
      <Area
        type="monotone"
        dataKey="positive"
        name="Cases"
        stackId="1"
        stroke={COLORS.mediumgray}
        fill={COLORS.gray}
      />
    </AreaChart>
  );
};
export default StateTotals;
