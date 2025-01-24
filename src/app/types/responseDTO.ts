export interface GetNoteDTO{
  id: string,
  title: string,
  content: string,
  isPrivate: boolean,
  createdAt: Date,
}
export interface GetProfileDTO {
  id: string;
  sessionId: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  notes: GetNoteDTO[];
  friends: number;
}