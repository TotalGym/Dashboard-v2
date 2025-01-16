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
  { membersType: "NEW MEMBERS", number: "50" },
  { membersType: "OLD MEMBERS", number: "130" },
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
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="number"
            name="Members Count in this month"
            fill={colors[0]}
            barSize={50}
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
