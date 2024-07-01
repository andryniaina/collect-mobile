export interface CreateMeetingDTO {
  //array of emails of users to invite
  guests: string[];
  //agenda or "ordre du jour"
  agenda: string;
  description: string;
  //DATE STRING
  date: string;
}

export interface AddTaskDTO {
  //text of the task
  text: string;
  meetingId: string;
}

export interface AddNoteDTO {
  //text of the note
  text: string;
  meetingId: string;
}
