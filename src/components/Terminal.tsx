import React, { useState } from "react";
import Terminal from "terminal-in-react";

interface ICommandLine {
  commands: any;
  msg: string;
}

export const CommandLine: React.FC<ICommandLine> = ({ commands, msg }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Terminal
        color="green"
        backgroundColor="black"
        barColor="black"
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={commands}
        msg={msg}
      />
    </div>
  );
};
