import { PureComponent } from "react";
import styled from "styled-components";
import Link from "next/link";
import dayjs from "dayjs";
import { ComposedChart, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line, Legend } from "recharts";
import useStats, { basicOptions } from "../utils/useStats";
import COLORS from "../styles/colors";
import stateHash from "../lib/states";

import { StateDetailGrid, StateDetailVerticalGrid } from "../components/base/StateGrid";
import { StatGrid, StatBlock, DeathBlock, RecoveredBlock } from "../components/base/Stats"; 


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
      <div style={{ background: COLORS.offwhite, color: COLORS.darkteal, borderRadius: 5, padding: 10, margin: 0 }}>
        <h6 style={{ margin: 0 }}>{`${dayjs(label.toString(), "YYYYMMDD").format("MMMM DD")}`}</h6>
        {payload.map((item) => (
          <p style={{ color: item.fill, margin: 0 }}>
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
      <Area type="monotone" dataKey="positive" name="Cases" stackId="1" stroke={COLORS.mediumgray} fill={COLORS.gray} />
    </AreaChart>
  );
}

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
      <Tooltip content={<CustomTooltip />}/>
      <Legend />
      <CartesianGrid stroke={COLORS.mediumgray} />
      {/* <Area type="monotone" dataKey="death" name="total deaths" stroke={COLORS.mediumburgundy} fill={COLORS.burgundy} /> */}
      <Bar dataKey="deathIncrease" name="Deaths" barSize={10} fill={COLORS.pink} />
    </ComposedChart>
  );
}

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
      {/* <Area type="monotone" dataKey="positive" name="total cases" stroke={COLORS.gray} fill={COLORS.mediumgray} /> */}
      <Bar dataKey="positiveIncrease" name="Cases" barSize={10} fill={COLORS.teal} />
    </ComposedChart>
  );
}

const StateDetail = ({ id }) => {
  const { stats, loading, error } = useStats(US_STATE_DAILY_URL(id));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const latestData = stats[0];
  const sortedData = stats.sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <>
      <h2>State of {stateHash[id]}</h2>
      <StateDetailGrid>
        <>
          <StateDetailVerticalGrid>
            <StatBlock>
              <h6> Cases: </h6> <span> {latestData.positive.toLocaleString()} </span>
              <span
                style={{
                  color: `${COLORS.teal}`,
                }}
              >
                +{latestData.positiveIncrease.toLocaleString()}
              </span>
            </StatBlock>
            <DeathBlock>
              <h6> Deaths: </h6> <span> {latestData.death.toLocaleString()} </span>
              <span
                style={{
                  color: `${COLORS.pink}`,
                }}
              >
                +{latestData.deathIncrease.toLocaleString()}
              </span>
            </DeathBlock>
          </StateDetailVerticalGrid>
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
}

export default StateDetail; 