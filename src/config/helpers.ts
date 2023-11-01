export const console_output = (args: any, print: any) => {
  print(`${args._.join(" ") || args.color}`);
};

export const console_about = (args: any, print: any) => {
  print("CLI Version 1.0");
  print(
    "This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities."
  );
};

async function selectFile(print: any): Promise<File | null> {
  return new Promise<File | null>((resolve) => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.style.display = "none";
    inputElement.accept = ".csv";

    const handleChange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        resolve(files[0]);
        print(`${files[0].name} has been uploaded successfully`);
      } else {
        resolve(null);
      }
      // Remove the input element from the DOM
      document.body.removeChild(inputElement);
    };

    inputElement.addEventListener("change", handleChange);

    // Add the input element to the DOM and trigger a click event to open the file selection dialog
    document.body.appendChild(inputElement);
    inputElement.click();

    // Use a loop to wait for the change event
    const checkForFileSelection = () => {
      if (inputElement.parentNode) {
        setTimeout(checkForFileSelection, 100);
      } else {
        inputElement.removeEventListener("change", handleChange);
        resolve(null);
      }
    };

    checkForFileSelection();
  });
}

export const upload = (args: any, print: any) => {
  const selectFileRead = selectFile(print);
};
export const fetchPrice = async (symbol: string) => {
  const response = await fetch(
    `https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`
  );
  const data = await response.json();
  return data.price;
};

export const console_fetchPrice = (
  args: { _?: string[] },
  print: (message: string) => void
) => {
  if (!args._ || args._.length === 0) {
    print("Please provide a cryptocurrency pair symbol.");
    return;
  }

  const symbol = args._[0];
  fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      print(`The current price of ${symbol} is ${data.price}.`);
    })
    .catch((err) => {
      print(`Error: ${err.message}`);
    });
};

export const TERMINAL_COMMANDS = {
  echo: { method: console_output },
  print: { method: console_output },
  about: { method: console_about },
  help: {
    method: (args: any, print: any) => {
      print("Available commands:");
      print("- help: Show available commands");
      print("- about: Display information about this CLI");
      print(
        "- fetch-price [coin]: Fetch the current price of a specified cryptocurrency"
      );
      print(
        "- upload: Opens the file explorer to allow uploading csv files only."
      );
      print(
        "- draw [file] [columns]: Draws the chart of the specified columns of the file present in the draw-chart directory. "
      );
    },
  },
  "fetch-price": { method: console_fetchPrice },
  upload: { method: upload },
};
