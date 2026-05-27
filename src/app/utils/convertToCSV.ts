import type { PokemonByNameResponse } from '../api/pokemonApiTypes';

const formatValue = (value: string): string => {
  const shouldBeFormatted =
    value.includes(',') ||
    value.includes('"') ||
    value.includes('\n') ||
    value.includes('\r');

  return shouldBeFormatted ? `"${value.replaceAll('"', '""')}"` : value;
};

const convertToCSV = (data: PokemonByNameResponse[]): string => {
  const headers: Array<keyof PokemonByNameResponse> = [
    'name',
    'imgUrl',
    'description',
    'details',
  ];

  const rows = data
    .map((item) => {
      return headers
        .map((key) => {
          return formatValue(String(item[key]));
        })
        .join(',');
    })
    .join('\n');

  return [headers.join(','), rows].join('\n');
};

export default convertToCSV;
