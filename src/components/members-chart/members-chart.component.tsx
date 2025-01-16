import { Cell, Pie, PieChart, Tooltip } from "recharts";
import {
  MembersChartContainer,
  StatsText,
  StyledChartContainer,
  StyledStatesContainer,
} from "./members-chart.styles";

const data = [
  { name: "ACTIVE", value: 38 },
  { name: "IRREGULAR", value: 42 },
  { name: "INACTIVE", value: 12 },
  { name: "NEW", value: 8 },
];

const colors = [" #2CD889", "#D2B48C", "#F7617D", " #FFCD54"];

const StatsArray = [
  { percentage: "38%", text: "ACTIVE", color: "#2CD889" },
  { percentage: "42%", text: "IRREGULAR", color: "#D2B48C" },
  { percentage: "12%", text: "INACTIVE", color: "#F7617D" },
  { percentage: "8%", text: "NEW", color: "#FFCD54" },
];

const MembersChart = () => {
  return (
    <MembersChartContainer>
      <p>Members Activity Levels</p>
      <StyledChartContainer>
        <PieChart width={200} height={200}>
          <Tooltip/>
          <Pie data={data} dataKey={"value"} innerRadius={68} paddingAngle={6}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </StyledChartContainer>
      <StyledStatesContainer>
        {StatsArray.map((stat, index) => (
          <StatsText $bgcolor={stat.color} key={index}>
            {stat.percentage} {stat.text}
          </StatsText>
        ))}
      </StyledStatesContainer>
    </MembersChartContainer>
  );
};
export default MembersChart;
