import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ClubEnrollmentChartContainer,
  StyledEnrollmentChartTitle,
} from "./club-enrollment-chart.styles";

const data = [
  { membersType: "NEW MEMBERS", number: "80" },
  { membersType: "OLD MEMBERS", number: "250" },
];

const colors = ["#2CD889", "#FF6565"];

const ClubEnrollmentChart = () => {
  return (
    <ClubEnrollmentChartContainer>
      <StyledEnrollmentChartTitle>
        CLUB ENROLLMENT THIS MONTH
      </StyledEnrollmentChartTitle>
      <ResponsiveContainer width={"100%"} height={"80%"}>
        <BarChart width={200} height={200} data={data}>
          <Tooltip />
          <XAxis dataKey="membersType" />
          <YAxis ticks={[0, 50, 100, 150, 200]} />
          <Tooltip />
          <Bar
            dataKey="number"
            name="Count in this month"
            fill={colors[0]}
            barSize={40}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ClubEnrollmentChartContainer>
  );
};
export default ClubEnrollmentChart;
