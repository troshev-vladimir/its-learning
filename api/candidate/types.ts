export type UserId = string;

export interface Candidate {
  id: string;
  Name: string;
  LastName: string;
  FirstName: string;
  SurName: string;
  DateOfBirth: string;
  Gender: "Male" | "Female";
}

export interface CandidateProgressResp {
  id: string,
  name: string;
  quizestep: number;
  taskstep: number;
  step: number;
  finalstep: boolean;
  finalsteptime: string;
  sum: number;
  promodiscount: number;
}

export interface CandidateProgressReq {
  id: string;
  token: string;
  promo: string;
}
