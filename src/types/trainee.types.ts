export type LastAddedTraineeTable = {
  number: number;
  name: string;
  assignedCoach: string;
  dateOfAdmit: Date;
  subscribtionType: "monthly" | "annually";
  status: "active" | "inactive" | "new";
};

type AttendanceObject = {
  date: Date;
  status: "Present" | "Absent";
  _id: string;
};

type SelectedProgram = {
  _id: string;
  programName?: string;
};

type ContactInfo = {
  email: string;
  phoneNumber: string;
};

type MemberShip = {
  startDate: Date;
  endDate: Date;
};

type Progress = {
  milestones: string[];
  metrics: {
    fitness: string;
    strength: string;
  };
};

export type TraineeData = {
  contact: ContactInfo;
  membership: MemberShip;
  progress: Progress;
  attendance: AttendanceObject[];
  selectedPrograms: SelectedProgram[];
  subscriptionType: "monthly" | "annually";
  createdAt: Date;

  _id: string;
  name: string;
  gender: "Male" | "Female";
  role: "Trainee";
};

export type GetTraineesResponse = {
  results: TraineeData[];
  totalCount: number;
  page: number;
  limit: number;
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
};
