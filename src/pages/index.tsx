import React from "react";
import { CommandLine } from "@/components/Terminal";
import { TERMINAL_COMMANDS } from "@/config/commands";
import { WELCOME_MESSAGE } from "@/config/helpers";

const Home = () => {
  return (
    <CommandLine
      commands={TERMINAL_COMMANDS}
      msg={WELCOME_MESSAGE}
    />
  );
};

export default Home;
