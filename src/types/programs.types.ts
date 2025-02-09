export type Exercise = {
  _id?: string;
  name: string;
  sets: number;
  repetitions: number;
};

export type Schedule = {
  _id?: string;
  day: string;
  startTime: string;
  endTime: string;
};

type RegisteredTrainees = {
  _id: string;
  name: string;
};

export type Program = {
  _id: string;
  programName: string;
  exercises: Exercise[];
  description: string;
  monthlyPrice: number;
  annuallyPrice: number;
  image: string;
  schedule: Schedule[];
  registeredTrainees: RegisteredTrainees[];
  createdAt: Date;
};

export type GetProgramsResponse = {
  results: Program[];
  totalCount: number;
  page: number;
  limit: number;
};
