import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";
import { ReportsContainer, StyledReportCard } from "./reports.styles";

const reports = [
  "Store",
  "Staff",
  "Trainee",
  "Equipment",
  "Program",
  "Payment",
];

const ReportsAndAnalytics = () => {
  const navigate = useNavigate();
  return (
    <ReportsContainer>
      {reports.map((report) => (
        <StyledReportCard>
          {report} report
          <Button
            width="80%"
            onClick={() => navigate(`${report.toLocaleLowerCase()}-report`)}
          >
            Generate Report
          </Button>
        </StyledReportCard>
      ))}
    </ReportsContainer>
  );
};

export default ReportsAndAnalytics;
