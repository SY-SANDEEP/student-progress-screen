export interface Student {
  name: string;
  subject: string;
  examBoard: string;
  examDate: string;
}

export interface Topic {
  id: number;
  name: string;
  mastery: number;
  questionsAttempted: number;
  lastStudied: string | null;
}

export interface StudentData {
  student: Student;
  topics: Topic[];
}
