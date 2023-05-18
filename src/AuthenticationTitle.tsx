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
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInAnonymously, signOut, User, AuthError } from "firebase/auth";

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
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 20),
  },
  {
    uid: "2",
    title: "Prepare presentation slides",
    description: "Create slides for the upcoming meeting",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 22),
  },
  {
    uid: "3",
    title: "Send client follow-up email",
    description: "Follow up with the client regarding their request",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 23),
  },
  {
    uid: "4",
    title: "Review code changes",
    description: "Review and provide feedback on the pull request",
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 24),
  },
  {
    uid: "5",
    title: "Schedule team meeting",
    description: "Coordinate and schedule a team meeting",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 25),
  },
  {
    uid: "6",
    title: "Read book chapter",
    description: "Read and summarize chapter 3 of the book",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 26),
  },
  {
    uid: "7",
    title: "Pay utility bills",
    description: "Make payments for electricity, water, and internet bills",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 27),
  },
  {
    uid: "8",
    title: "Attend project kickoff meeting",
    description: "Join the project kickoff meeting with stakeholders",
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 28),
  },
  {
    uid: "9",
    title: "Exercise for 30 minutes",
    description: "Engage in physical exercise for at least 30 minutes",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 29),
  },
  {
    uid: "10",
    title: "Write blog post",
    description: "Create a blog post about the latest industry trends",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(2023, 5, 30),
  },
];

export function AuthenticationTitle() {
  const [user, loading, error] = useAuthState(auth);

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
          <Text>Welcome {user.uid}</Text>
        </>
      ) : (
        // show log in button when not logged in, but don't show log in button when loading
        !loading && <Button onClick={logInAnonymously}>Log in</Button>
      )}

      <AllTodoList data={dummyData} />
    </Container>
  );
}
