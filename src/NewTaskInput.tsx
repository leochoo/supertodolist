import { useState } from "react";
import { Container, Button, TextInput, Text } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

interface NewTaskInputProps {
  addTask: (task: Task) => void;
}

interface Task {
  uid: string;
  title: string;
  description: string;
  project: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
}

export function NewTaskInput({ addTask }: NewTaskInputProps) {
  const [showInputField, setShowInputField] = useState(false);
  const [task, setTask] = useState<Task>({
    uid: "",
    title: "",
    description: "",
    project: "",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(),
  });

  const handleNewTaskClick = () => {
    setShowInputField(true);
  };

  const handleTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const taskWithUID = { ...task, uid: uuidv4() };
    addTask(taskWithUID);
    setTask({
      uid: "",
      title: "",
      description: "",
      project: "",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
    });
    setShowInputField(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
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
          <TextInput
            label="Due Date"
            name="dueDate"
            type="date"
            value={task.dueDate.toISOString().split("T")[0]}
            onChange={handleInputChange}
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
