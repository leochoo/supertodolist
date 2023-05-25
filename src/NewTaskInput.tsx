import { useState } from "react";
import { TextInput, Button, Container } from "@mantine/core";
import {
  collection,
  addDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { Task } from "./types/types";
import { db } from "./firebase";
import { DateInput } from "@mantine/dates";
import { v4 as uuidv4 } from "uuid";
import { User } from "firebase/auth";

interface NewTaskInputProps {
  user: User;
}

export function NewTaskInput({ user }: NewTaskInputProps) {
  const [showInputField, setShowInputField] = useState(false);
  const [task, setTask] = useState<Task>({
    uid: "",
    title: "",
    description: "",
    project: "",
    completed: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    dueDate: null,
  });

  const handleNewTaskClick = () => {
    setShowInputField(true);
  };

  const handleTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const taskWithUID = { ...task, uid: uuidv4() };

    // Add the task to the Tasks collection
    try {
      const tasksCollectionRef = collection(db, "Users", user.uid, "Tasks");
      await addDoc(tasksCollectionRef, taskWithUID);
      console.log("Task added to Firestore");
    } catch (error) {
      console.log("Error adding task to Firestore:", error);
      return;
    }

    // Clear the form and reset the state
    setTask({
      uid: "",
      title: "",
      description: "",
      project: "",
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      dueDate: null,
    });
    setShowInputField(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleDateChange = (value: Date | null) => {
    const dueDate = value ? Timestamp.fromDate(value) : null;
    setTask((prevTask) => ({ ...prevTask, dueDate }));
  };

  return (
    <Container my={40}>
      {showInputField ? (
        <form onSubmit={handleTaskSubmit}>
          <TextInput
            label="Title"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Description"
            name="description"
            value={task.description}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Project"
            name="project"
            value={task.project}
            onChange={handleInputChange}
            required
          />
          <DateInput
            value={task.dueDate?.toDate() || null}
            onChange={handleDateChange}
            label="Due Date"
            required
          />
          <Button type="submit" color="red">
            Add Task
          </Button>
        </form>
      ) : (
        <Button onClick={handleNewTaskClick}>New Task</Button>
      )}
    </Container>
  );
}

// import { useState } from "react";
// import { Container, Button, TextInput, Text } from "@mantine/core";
// import { v4 as uuidv4 } from "uuid";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { Task } from "./types/types";
// import { db } from "./firebase";

// export function NewTaskInput() {
//   const [showInputField, setShowInputField] = useState(false);
//   const [task, setTask] = useState<Task>({
//     uid: "",
//     title: "",
//     description: "",
//     project: "",
//     completed: false,
//     createdAt: null,
//     updatedAt: null,
//     dueDate: null,
//   });

//   const handleNewTaskClick = () => {
//     setShowInputField(true);
//   };

//   const handleTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const taskWithUID = { ...task, uid: uuidv4() };

//     // Add the task to the Tasks collection
//     try {
//       const tasksCollectionRef = collection(db, "Tasks");
//       await addDoc(tasksCollectionRef, taskWithUID);
//     } catch (error) {
//       console.log("Error adding task to Firestore:", error);
//       return;
//     }

//     // Clear the form and reset the state
//     setTask({
//       uid: "",
//       title: "",
//       description: "",
//       project: "",
//       completed: false,
//       createdAt: null,
//       updatedAt: null,
//       dueDate: null,
//     });
//     setShowInputField(false);
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.currentTarget;
//     setTask((prevTask) => ({ ...prevTask, [name]: value }));
//   };

//   return (
//     <Container my={40}>
//       {showInputField ? (
//         <form onSubmit={handleTaskSubmit}>
//           <TextInput
//             label="Title"
//             name="title"
//             value={task.title}
//             onChange={handleInputChange}
//             required
//           />
//           <TextInput
//             label="Description"
//             name="description"
//             value={task.description}
//             onChange={handleInputChange}
//             required
//           />
//           <TextInput
//             label="Project"
//             name="project"
//             value={task.project}
//             onChange={handleInputChange}
//             required
//           />
//           <TextInput
//             label="Due Date"
//             name="dueDate"
//             type="date"
//             value={
//               task.dueDate instanceof Date
//                 ? task.dueDate.toISOString().split("T")[0]
//                 : ""
//             }
//             onChange={handleInputChange}
//             required
//           />
//           <Button type="submit" color="red">
//             Add Task
//           </Button>
//         </form>
//       ) : (
//         <Button onClick={handleNewTaskClick}>New Task</Button>
//       )}
//     </Container>
//   );
// }
