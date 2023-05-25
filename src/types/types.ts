import { FieldValue, Timestamp } from "firebase/firestore";

export interface Task {
  uid: string;
  title: string;
  description?: string;
  project?: string;
  completed: boolean;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  dueDate: Timestamp | null;
}
