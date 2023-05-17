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

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInAnonymously, signOut } from "firebase/auth";

const logInAnonymously = () => {
  signInAnonymously(auth)
    .then(() => {
      console.log("Logged in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      console.log("error");
    });
};

const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export function AuthenticationTitle() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Super To Do List
      </Title>
      {user ? (
        <Button onClick={logOut}>Sign out</Button>
      ) : (
        <Button onClick={logInAnonymously}>Log in anonymously</Button>
      )}

      {/* <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper> */}
    </Container>
  );
}
