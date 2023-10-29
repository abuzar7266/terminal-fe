import React, { useState } from "react";
import { CommandLine } from "@/components/Terminal";
import { TERMINAL_DEFAULT } from "@/config/constants";
import { TERMINAL_COMMANDS } from "@/config/helpers";

const Home = () => {
  return (
    <CommandLine
      commands={TERMINAL_COMMANDS}
      msg={TERMINAL_DEFAULT.START_MSG}
    />
  );
};

export default Home;
