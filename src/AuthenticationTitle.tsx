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
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { NewTaskInput } from "./NewTaskInput";
import { useEffect, useState } from "react";
import { Task } from "./types/types";
import { serverTimestamp } from "firebase/firestore";

const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch(() => {
      // An error happened.
    });
};

export function AuthenticationTitle() {
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const tasksCollectionRef = collection(db, "Users", user.uid, "Tasks");
        const tasksSnapshot = await getDocs(tasksCollectionRef);
        const tasksData = tasksSnapshot.docs.map((doc) => doc.data() as Task);
        setTasks(tasksData);
      };

      fetchTasks();
    }
  }, [user]);

  // console log tasks if task is not empty
  useEffect(() => {
    if (tasks.length !== 0) {
      console.log(tasks);
      console.log(tasks[0].dueDate && tasks[0].dueDate.toDate().toISOString());
    }
  }, [tasks]);

  const createUserAndTasks = async (user: User) => {
    const userRef = doc(db, "Users", user.uid);
    const tasksRef = collection(userRef, "Tasks");

    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        createdAt: serverTimestamp(),
      });

      await setDoc(doc(tasksRef), {
        uid: user.uid,
        title: "Sample Task",
        description: "This is a sample task",
        project: "Sample Project",
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        dueDate: new Date(),
      });
    }
  };

  const logInAnonymously = () => {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential?.user;

        if (!user) {
          throw new Error("Failed to log in anonymously");
        }

        createUserAndTasks(user);

        console.log("Logged in anonymously");
      })
      .catch((error) => {
        console.log("Error logging in anonymously:", error);
      });
  };

  const handleSignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential?.user;

      if (!user) {
        throw new Error("Failed to sign in with Google");
      }

      createUserAndTasks(user);

      console.log("Signed in with Google");
    } catch (error) {
      console.log("Error signing in with Google:", error);
    }
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

      {loading && <Text align="center">Loading...</Text>}
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
        !loading && (
          <>
            <Button onClick={logInAnonymously}>Log in anonymously</Button>
            <Button onClick={handleSignInWithGoogle}>
              Sign in with Google
            </Button>
          </>
        )
      )}
      <Container my={20}>{user && <NewTaskInput user={user} />}</Container>

      <AllTodoList data={tasks} />
    </Container>
  );
}
