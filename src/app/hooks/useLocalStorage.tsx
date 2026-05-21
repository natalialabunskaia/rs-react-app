export const useLocalStorage = (key: string) => {
  const setLocalStorageValue = (value: string) => {
    localStorage.setItem(key, value);
  };
  const getLocalStorageValue = () => {
    return localStorage.getItem(key || '');
  };
  return { setLocalStorageValue, getLocalStorageValue };
};

