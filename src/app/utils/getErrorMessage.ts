const networkErrorMessage =
  'Network error. Please check your internet connection.';
const badRequestErrorMessage =
  'This Pokémon type does not exist. Please try another type.';
const defaultErrorMessage = 'Something went wrong. Please try again later.';

const getErrorMessage = (errorCode: string): string => {
  if (errorCode === 'ERR_BAD_REQUEST') {
    return badRequestErrorMessage;
  }

  if (errorCode === 'ERR_NETWORK') {
    return networkErrorMessage;
  }

  return defaultErrorMessage;
};

export default getErrorMessage;
