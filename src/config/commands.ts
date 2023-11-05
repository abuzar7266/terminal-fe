import { commandAbout, commandDeleteDrawFile, commandDrawChart, commandFetchPrice, commandHelp, commandPrint, commandUpload } from "./helpers";

export const TERMINAL_COMMANDS = {
    echo: { method: commandPrint },
    print: { method: commandPrint },
    about: { method: commandAbout },
    help: { method: commandHelp },
    upload: { method: commandUpload },
    draw: {method: commandDrawChart},
    delete: {method: commandDeleteDrawFile},
    "fetch-price": { method: commandFetchPrice }
  };