import { PureComponent, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import dayjs from "dayjs";
import {
  ComposedChart,
  AreaChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";
import useStats, { basicOptions } from "../utils/useStats";
import COLORS from "../styles/colors";
import stateHash from "../lib/states";

import {
  StateDetailGrid,
  StateDetailVerticalGrid,
} from "../components/base/StateGrid";
import {
  StatGrid,
  StatBlock,
  DeathBlock,
  RecoveredBlock,
} from "../components/base/Stats";

import { US_STATE_DAILY_URL } from "../lib/urls";

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill={COLORS.mediumgray}>
          {dayjs(payload.value.toString(), "YYYYMMDD").format("MMM DD")}
        </text>
      </g>
    );
  }
}

class CustomizedYAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={-10} dy={16} textAnchor="end" fill={COLORS.mediumgray}>
          {payload.value.toLocaleString()}
        </text>
      </g>
    );
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div
        style={{
          background: COLORS.offwhite,
          color: COLORS.darkteal,
          borderRadius: 5,
          padding: 10,
          margin: 0,
        }}
      >
        <h6 style={{ margin: 0 }}>{`${dayjs(
          label.toString(),
          "YYYYMMDD"
        ).format("MMMM DD")}`}</h6>
        {payload.map((item, idx) => (
          <p key={idx} style={{ color: item.fill, margin: 0 }}>
            {item.value.toLocaleString()} {item.name}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const StateTotalsChart = ({ data }) => {
  return (
    <AreaChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid stroke={COLORS.mediumgray} />
      <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
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

const StateDeathComposedChart = ({ data }) => {
  return (
    <ComposedChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
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

const StatePositiveComposedChart = ({ data }) => {
  return (
    <ComposedChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
      <YAxis tick={<CustomizedYAxisTick />} />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <CartesianGrid stroke={COLORS.mediumgray} />
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

const StateTotalsPieChart = ({ data }) => {
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
      percent,
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
    { name: "Deaths", value: data.death, color: COLORS.burgundy },
    { name: "New Deaths", value: data.deathIncrease, color: COLORS.pink },
  ];
  return (
    <PieChart width={800} height={800}>
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
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

const addThreeDayAverages = (data) => {
  // let outputData = [];
  for (let i = 0; i < data.length; i++) {
    // three day average for deaths
    let day0DeathIncrease =
      data[i - 1] !== undefined
        ? data[i - 1].deathIncrease !== (null || undefined)
          ? data[i - 1].deathIncrease
          : 0
        : 0;

    let day1DeathIncrease =
      data[i].deathIncrease !== null ? data[i].deathIncrease : 0;
    let day2DeathIncrease =
      data[i + 1] !== undefined
        ? data[i + 1].deathIncrease !== (null || undefined)
          ? data[i + 1].deathIncrease
          : 0
        : 0;
    data[i].deathThreeDayAverage = Math.floor(
      (day0DeathIncrease + day1DeathIncrease + day2DeathIncrease) / 3
    );

    // three day average for deaths
    let day0CasesIncrease =
      data[i - 1] !== undefined
        ? data[i - 1].positiveIncrease !== (null || undefined)
          ? data[i - 1].positiveIncrease
          : 0
        : 0;

    let day1CasesIncrease =
      data[i].positiveIncrease !== null ? data[i].positiveIncrease : 0;
    let day2CasesIncrease =
      data[i + 1] !== undefined
        ? data[i + 1].positiveIncrease !== (null || undefined)
          ? data[i + 1].positiveIncrease
          : 0
        : 0;
    data[i].casesThreeDayAverage = Math.floor(
      (day0CasesIncrease + day1CasesIncrease + day2CasesIncrease) / 3
    );
  }
  return data;
};

const StateDetail = ({ id }) => {
  const { stats, loading, error } = useStats(US_STATE_DAILY_URL(id));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const latestData = stats[0];
  const sortedData = addThreeDayAverages(
    stats.sort((a, b) => (a.date > b.date ? 1 : -1))
  );

  return (
    <>
      <h2>State of {stateHash[id]}</h2>
      <StateDetailGrid>
        <>
          <StateTotalsPieChart data={latestData} />

          {/* <StateDetailVerticalGrid>
            <StatBlock>
              <h6> Cases: </h6>
              <span> {latestData.positive.toLocaleString()} </span>
              <span
                style={{
                  color: `${COLORS.teal}`,
                }}
              >
                +{latestData.positiveIncrease.toLocaleString()}
              </span>
            </StatBlock>
            <DeathBlock>
              <h6> Deaths: </h6>
              <span> {latestData.death.toLocaleString()} </span>
              <span
                style={{
                  color: `${COLORS.pink}`,
                }}
              >
                +{latestData.deathIncrease.toLocaleString()}
              </span>
            </DeathBlock>
          </StateDetailVerticalGrid> */}
        </>
        <div>
          <StateTotalsChart data={sortedData} />
          <h3>New Cases</h3>
          <StatePositiveComposedChart data={sortedData} />
          <h3>New Deaths</h3>
          <StateDeathComposedChart data={sortedData} />
        </div>
      </StateDetailGrid>
    </>
  );
};

export default StateDetail;
