import React from "react";
import Terminal from "terminal-in-react";
import { ICommandLine } from "@/config/interfaces";

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
        color="white"
        backgroundColor="black"
        barColor="gray"
        style={{ fontWeight: "bold", fontSize: "0.8em", fontFamily:'monospace' }}
        commands={commands}
        msg={msg}
      />
    </div>
  );
};
