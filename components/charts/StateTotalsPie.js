import { useState } from "react";

import { PieChart, Pie, Sector, Cell } from "recharts";
import COLORS from "../../styles/colors";

const StateTotalsPie = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [innerActiveIndex, setInnerActiveIndex] = useState(-1);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
    setInnerActiveIndex(-1);
  };

  const onInnerPieEnter = (data, index) => {
    setActiveIndex(-1);
    setInnerActiveIndex(index);
  };
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      value,
    } = props;
    return (
      <g>
        <text x={cx} y={cy} dy={0} textAnchor="middle" fill={COLORS.offwhite}>
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={18} textAnchor="middle" fill={COLORS.offwhite}>
          {`${value.toLocaleString()}`}
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
        activeIndex={innerActiveIndex}
        data={innerPieData}
        dataKey="value"
        cx={350}
        cy={400}
        innerRadius={100}
        outerRadius={150}
        onMouseOver={onInnerPieEnter}
        activeShape={renderActiveShape}
        startAngle={90}
        endAngle={450}
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
        startAngle={90}
        endAngle={450}
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
