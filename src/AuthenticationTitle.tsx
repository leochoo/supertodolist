import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { AllTodoList } from "./AllToDoList";
import { auth, db } from "./firebase";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
  signInAnonymously,
  signOut,
  User,
  AuthError,
  UserCredential,
} from "firebase/auth";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { NewTaskInput } from "./NewTaskInput";
import { useState } from "react";

const logInAnonymously = () => {
  signInAnonymously(auth)
    .then(() => {
      console.log("Logged in");
    })
    .catch((error) => {
      // ...
      console.log("error");
    });
};

const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch(() => {
      // An error happened.
    });
};

const dummyData = [
  {
    uid: "1",
    title: "Complete project proposal",
    description: "Write and submit project proposal document",
    project: "School",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 20),
  },
  {
    uid: "2",
    title: "Prepare presentation slides",
    description: "Create slides for the upcoming meeting",
    project: "School",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 22),
  },
  {
    uid: "3",
    title: "Study for the exam",
    description: "Review lecture notes and textbooks",
    project: "School",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 25),
  },
  {
    uid: "4",
    title: "Submit assignment",
    description: "Complete and submit the programming assignment",
    project: "School",
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 27),
  },
  {
    uid: "5",
    title: "Read literature book",
    description: "Read and analyze the assigned literature book",
    project: "School",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 30),
  },
  {
    uid: "6",
    title: "Go for a run",
    description: "Run 5 miles in the park",
    project: "Personal",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 21),
  },
  {
    uid: "7",
    title: "Organize closet",
    description: "Declutter and organize the bedroom closet",
    project: "Personal",
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 23),
  },
  {
    uid: "8",
    title: "Plan vacation",
    description: "Research and plan the upcoming vacation",
    project: "Personal",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 25),
  },
  {
    uid: "9",
    title: "Practice guitar",
    description: "Learn and practice new guitar chords",
    project: "Personal",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 28),
  },
  {
    uid: "10",
    title: "Watch movie",
    description: "Watch the latest blockbuster movie",
    project: "Personal",
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 30),
  },
];

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

export function AuthenticationTitle() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const [tasks, setTasks] = useState(dummyData);

  const handleSignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential?.user;

      if (!user) {
        throw new Error("Failed to sign in with Google");
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // User is signing in for the first time, create a new document
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          createdAt: new Date(),
        });

        console.log("New user document created");
      } else {
        console.log("User already exists in Firestore collection");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = (newTask: Task) => {
    // Update the dummyData array with the new task
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Container my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Super To Do List
      </Title>

      {/* show loading screen when loading */}
      {loading && <Text align="center">Loading...</Text>}
      {/* show error when error */}
      {error && (
        <Text align="center" color="red">
          {String(error)}
        </Text>
      )}

      {user ? (
        <>
          <Button onClick={logOut}>Sign out</Button>
          <Text>Welcome {user.user.displayName}</Text>
        </>
      ) : (
        // show log in button when not logged in, but don't show log in button when loading
        !loading && <Button onClick={handleSignInWithGoogle}>Log in</Button>
      )}
      <Container my={20}>
        <NewTaskInput addTask={handleAddTask} />
      </Container>

      <AllTodoList data={tasks} />
    </Container>
  );
}
