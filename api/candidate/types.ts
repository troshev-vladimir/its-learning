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
