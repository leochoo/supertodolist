import { Timestamp } from "firebase/firestore";

export interface Task {
  uid: string;
  title: string;
  description?: string;
  project?: string;
  completed: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  dueDate: Timestamp | null;
}
