export enum ERROR_MSG{
  WINDOW_NETWORK = 'Network error in the new opened window',
  NETWORK_FAILED = 'Error: an error occurred in network request',
  EMPTY_PAIR_INPUT = '  Error: please provide a cryptocurrency pair symbol.',
  NO_FILENAME = 'Error: no file name detected',
  INVALID_FILENAME = 'Error: invalid file names detected.',
  EXCEED_FILENAMES = 'Error: more than one file name detected',
  NO_COLUMN = 'Invalid input: no column name detected',
  SPECIAL_SYMBOLS = '',
  ALPHANUMERIC_VALUES= "Invalid input: comma-separated column name values must contain only alphanumeric characters and spaces.",
  EMPTY_ARGS = 'Invalid input: please provide a non-empty array of strings.',
  FILE_UPLOAD = 'Error: failed to upload the selected file',
  FAILED_FETCH = 'Failed to fetch data. Status: '
}

export enum STATUS{
  SUCCESS = 'Success',
  ERROR = 'Error'
}
