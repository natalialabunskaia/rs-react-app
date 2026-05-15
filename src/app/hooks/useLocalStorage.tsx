export const useLocalStorage = (key: string) => {
  const setValue = (value: string) => {
    localStorage.setItem(key, value);
  };
  const getValue = () => {
    return localStorage.getItem(key || '');
  };
  return { setValue, getValue };
};

