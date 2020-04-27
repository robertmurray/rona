import { PureComponent } from "react";
import dayjs from "dayjs";

import COLORS from "../../styles/colors";
export class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={10} y={0} dy={16} textAnchor="end" fill={COLORS.gray}>
          {dayjs(payload.value.toString(), "YYYYMMDD").format("MMM DD")}
        </text>
      </g>
    );
  }
}

export class CustomizedYAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={10}
          dx={-10}
          y={-10}
          dy={16}
          textAnchor="end"
          fill={COLORS.gray}
        >
          {payload.value.toLocaleString()}
        </text>
      </g>
    );
  }
}

export const CustomTooltip = ({ active, payload, label }) => {
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
