type excercise = {
  _id: string;
  name: string;
  sets: number;
  repetitions: number;
};

type Schedule = {
  _id: string;
  day:
    | " Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
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
  exercises: excercise[];
  description: string;
  monthlyPrice: number;
  image: string;
  schedule: Schedule[];
  registeredTrainees: RegisteredTrainees[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type GetProgramsResponse = {
  results: Program[];
  totalCount: number;
  page: number;
  limit: number;
};
