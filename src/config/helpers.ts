import DrawChartAPI from '@/api/chartData';
import { ERROR_MSG, STATUS } from './constants';

export const commandPrint = (args: any, print: any) => {
  print(`${args._.join(" ") || args.color}`);
};

export function extractAndValidateColumns(strings: string[]) {
  if (!Array.isArray(strings) || strings.length === 0) {
    return {
      status: STATUS.ERROR,
      message: ERROR_MSG.EMPTY_ARGS,
    }
  }

  const lastString = strings[strings.length - 1];

  if (lastString.includes(',')) {
    const values = lastString.split(',').map(value => value.trim());
    console.log(lastString);
    const isValid = values.every(value => /^[A-Za-z0-9 !@#$%^&*()_+{}\[\]:;"'<>,.?/\\|=-]+(?: [A-Za-z0-9 !@#$%^&*()_+{}\[\]:;"'<>,.?/\\|=-]+)*$/.test(value));
    
    if (!isValid) {
      return {
        status: STATUS.ERROR,
        message: ERROR_MSG.ALPHANUMERIC_VALUES
      }
    }

    return {
      status: STATUS.SUCCESS,
      list: values
    }
  } else {
    if (/[^A-Za-z0-9 ]/.test(lastString)) {
      return {
        status: STATUS.ERROR,
        message: ERROR_MSG.SPECIAL_SYMBOLS
      }
    }else if (lastString===""){
      return {
        status: STATUS.ERROR,
        message: ERROR_MSG.NO_COLUMN
      }
    }

    return {
      status: STATUS.SUCCESS,
      list: [lastString]
    }
  }
}


export function extractAndValidateCsvFiles(argsList: string[][]) {
  const validFileNames = [];
  const invalidFileNames = [];

  for (const input of argsList) {
    const combinedInput = input.join(' ');
    const regex = /(["'])(.*?)\1/g;
    const fileMatches = combinedInput.match(regex);

    if (!fileMatches) {
      continue;
    }

    const fileNames = fileMatches.map(match => match.slice(1, -1));

    for (const fileName of fileNames) {
      if (/^[\w\s-]+\.[a-zA-Z]{2,5}$/.test(fileName) && fileName.endsWith(".csv")) {
        validFileNames.push(fileName);
      } else {
        invalidFileNames.push(fileName);
      }
    }
  }


  if(validFileNames.length === 0){
    return {
      status: STATUS.ERROR,
      message: ERROR_MSG.NO_FILENAME
    }
  }else if(invalidFileNames.length>0){
    return {
      status: STATUS.ERROR,
      message: ERROR_MSG.INVALID_FILENAME
    }
  } else if(validFileNames.length>1){
    return {
      status: STATUS.ERROR,
      message: ERROR_MSG.EXCEED_FILENAMES
    }
  } 
  else{
    return {
      status: STATUS.SUCCESS,
      fileName: validFileNames[0]
    }
  }
}



export const commandAbout = (args: any, print: any) => {
  print("CLI Version 1.0");
  print(
    "This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities."
  );
};

export async function selectAndUploadCsv(print: any): Promise<File | null> {
  return new Promise<File | null>((resolve) => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.style.display = "none";
    inputElement.accept = ".csv";
    const handleChange = async (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const formData = new FormData(); 

        if (files[0]) {
            formData.append('file', files[0]);
        }
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cli/upload`, { method: 'POST', body: formData});
          if(response){
            const data = await response.json();
            print(data?.message);
          }
          else
            print(ERROR_MSG.FILE_UPLOAD);
          resolve(files[0]);
        }catch(err){
          print(ERROR_MSG.NETWORK_FAILED);
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

export const commandUpload = (args: any, print: any) =>{
  selectAndUploadCsv(print);
}

export const commandFetchPrice = (
  args: { _?: string[] },
  print: (message: string) => void
) => {
  if (!args._ || args._.length === 0) {
    print(ERROR_MSG.EMPTY_PAIR_INPUT);
    return;
  }

  const symbol = args._[0];
  fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${ERROR_MSG.FAILED_FETCH}${res.status}`);
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


export const deleteFile = async (print: any, filename: string): Promise<any | null> => {
  return new Promise<any | null>((resolve) => {
    const response = DrawChartAPI.deleteChartData(filename);
    response.then((data)=>{
      print(data?.data?.message);
    }).catch((err)=>{
      print(ERROR_MSG.NETWORK_FAILED);
    })
    resolve(response);
  });
}

export const commandDeleteDrawFile = (args: any, print: any) =>{
  const file = extractAndValidateCsvFiles([args._]);
  if(file?.status===STATUS.ERROR){
    print(file?.message)
  }else{
    deleteFile(print, file && file?.fileName ? file?.fileName:'');
  }
}
export const commandDrawChart = (args: any, print: any) =>{
  const file = extractAndValidateCsvFiles([args._]);
  const values = extractAndValidateColumns(args._);
  let error = false;
  if([file?.status, values?.status].includes(STATUS.ERROR)){
    print(file?.message ? file?.message : values?.message);
  }else{
    let chartWindow = window.open(`/drawChart?filename=${file?.fileName}&columns=${values?.list?.join(',')}`)
    if (chartWindow) {
      chartWindow.onload = () => {
        print(`Drawing chart based on ${file?.fileName}...`);
      };
      chartWindow.addEventListener('load', ()=>{
        chartWindow?.addEventListener('error', (event) => {
          error = true;
          print(ERROR_MSG.WINDOW_NETWORK);
        });
        if(!error){
          print('Chart drawn successfully.')
        }
      })
    }
  }
}
export const commandHelp = (args: any, print: any) => {
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
}

export const getActionTypes = (action: string) => {
  return {
     STARTED: `${action}.STARTED`,
     FULLFILLED: `${action}.FULLFILLED`,
     REJECTED: `${action}.REJECTED`,
  }
}


//-----------------------------
//----WELCOME TEXT GENERATE----
//-----------------------------
const pyramidLevel = 10;
const pyramidCharacter = '*';
function generatePyramid(level: any, character: any) {
  let pyramid = '';
  for (let i = 1; i <= level; i++) {
    const spaces = ' '.repeat(level - i);
    const stars = character.repeat(2 * i - 1);
    pyramid += spaces + stars + spaces + '\n';
  }
  return pyramid;
}
const leftHalf = generatePyramid(pyramidLevel, pyramidCharacter);
const name = 'Abuzar';

const rightHalf = `
Name: ${name}
Project: Antematter.io Full-Stack Challenge
---------------------------------------------------------
`;
export const WELCOME_MESSAGE = leftHalf + rightHalf;
