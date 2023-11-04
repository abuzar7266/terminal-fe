import React from "react";
import { CommandLine } from "@/components/Terminal";
import { DEFAULT } from "@/config/constants";
import { TERMINAL_COMMANDS } from "@/config/helpers";

const Home = () => {
  return (
    <CommandLine
      commands={TERMINAL_COMMANDS}
      msg={DEFAULT.START_MSG}
    />
  );
};

export default Home;
