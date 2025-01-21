export type Trainee = {
  number: number;
  name: string;
  assignedCoach: string;
  dateOfAdmit: Date;
  subscribtionType: "monthly" | "annually";
  status: "active" | "inactive" | "new";
};
