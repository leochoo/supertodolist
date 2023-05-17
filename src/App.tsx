import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { MantineProvider, Text } from "@mantine/core";

import { AuthenticationTitle } from "./AuthenticationTitle";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <AuthenticationTitle />
    </MantineProvider>
  );
}

export default App;