export const console_output = (args: any, print: any) => {
  print(`${args._.join(" ") || args.color}`);
};

export const console_about = (args: any, print: any) => {
  print("CLI Version 1.0");
  print(
    "This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities."
  );
};

async function selectAndUpload(print: any): Promise<File | null> {
  return new Promise<File | null>((resolve) => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.style.display = "none";
    inputElement.accept = ".csv";

    const handleChange = async (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const formData = new FormData(); // Create a FormData object

        if (files[0]) {
            formData.append('file', files[0]); // Append the file to the FormData object
        }
        try{
          const response = await fetch('http://127.0.0.1:8080/cli/upload', { method: 'POST', body: formData});
          if(response.status===200){
            let {msg} = await response.json();
            print(msg);
          }
          else
            print(`Error: failed to upload the selected file`);
          resolve(files[0]);
        }catch(err){
          print(`Error: failed to connect with server`);
        }
      } else {
        resolve(null);
      }
      document.body.removeChild(inputElement);
    };

    inputElement.addEventListener("change", handleChange);

    document.body.appendChild(inputElement);
    inputElement.click();

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

export const command_upload = (args: any, print: any) => {
  selectAndUpload(print);
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
  upload: { method: command_upload },
};
