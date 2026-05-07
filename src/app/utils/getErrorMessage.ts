import axios from 'axios';

const networkErrorMessage =
  'Network error. Please check your internet connection.';
const badRequestErrorMessage =
  'This Pokémon type does not exist. Please try another type.';
const defaultErrorMessage = 'Something went wrong. Please try again later.';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_BAD_REQUEST') {
      return badRequestErrorMessage;
    }

    if (error.code === 'ERR_NETWORK') {
      return networkErrorMessage;
    }
  }

  return defaultErrorMessage;
};

export default getErrorMessage;
