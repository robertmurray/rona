import { useState } from "react";

import { PieChart, Pie, Sector, Cell } from "recharts";
import COLORS from "../../styles/colors";

const StateTotalsPie = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const RADIAN = Math.PI / 180;

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius - 1}
          outerRadius={outerRadius + 20}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill={payload.color}
        >{`${payload.name}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill={payload.color}
        >
          {`${value.toLocaleString()}`}
        </text>
      </g>
    );
  };

  const pieData = [
    {
      name: "Cases",
      value: data.positive,
      color: COLORS.teal,
    },
    { name: "Deaths", value: data.death, color: COLORS.burgundy },
  ];

  const innerPieData = [
    {
      name: "New Cases",
      value: data.positiveIncrease,
      color: COLORS.mediumteal,
    },
    {
      name: "Recovered",
      value: data.recovered ? data.recovered : 0,
      color: COLORS.mediumgray,
    },
    { name: "New Deaths", value: data.deathIncrease, color: COLORS.pink },
  ];
  return (
    <PieChart width={800} height={800}>
      <Pie
        data={innerPieData}
        dataKey="value"
        cx={350}
        cy={400}
        innerRadius={100}
        outerRadius={150}
        fill={COLORS.gray}
      >
        {innerPieData.map((entry, index) => (
          <Cell key={index} fill={entry.color} stroke="none" />
        ))}
      </Pie>

      <Pie
        activeIndex={activeIndex}
        data={pieData}
        cx={350}
        cy={400}
        innerRadius={180}
        outerRadius={230}
        fill={COLORS.mediumgray}
        activeShape={renderActiveShape}
        onMouseEnter={onPieEnter}
        dataKey="value"
      >
        {pieData.map((entry, index) => (
          <Cell key={index} fill={entry.color} stroke="none" />
        ))}
      </Pie>
    </PieChart>
  );
};

export default StateTotalsPie;
