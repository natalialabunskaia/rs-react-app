import { it, describe, expect } from 'vitest';
import getErrorMessage from '../../app/utils/getErrorMessage';


describe('getErrorMessage', () => {
  it('should return network error message for network error', () => {
    const networkErrorMessage =
      'Network error. Please check your internet connection.';
    const error = {
      isAxiosError: true,
      code: 'ERR_NETWORK',
    };
    expect(getErrorMessage(error)).toBe(networkErrorMessage);
  });
  it('should return bad request message for request error', () => {
    const badRequestErrorMessage =
      'This Pokémon type does not exist. Please try another type.';
    const error = {
      isAxiosError: true,
      code: 'ERR_BAD_REQUEST',
    };
    expect(getErrorMessage(error)).toBe(badRequestErrorMessage);
  });
  it('should return default error message for unknown error', () => {
    const defaultErrorMessage = 'Something went wrong. Please try again later.';
    const error = {
      isAxiosError: true,
      code: 'ERR_SOMETHING_ELSE',
    };
    expect(getErrorMessage(error)).toBe(defaultErrorMessage);
  });
  it('should return default error message for non axios error', () => {
    const defaultErrorMessage = 'Something went wrong. Please try again later.';
    const error = {
      isAxiosError: false,
      code: 'ERR_SOMETHING_ELSE',
    };
    expect(getErrorMessage(error)).toBe(defaultErrorMessage);
  });
});
