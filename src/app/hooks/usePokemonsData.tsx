 import {useState} from 'react';
 import { pokeApiService } from '../service/pokeApiService';
 import getErrorMessage from '../utils/getErrorMessage';
 import type { PokemonDetails } from '../utils/types';
 import type { RequestStatus } from '../utils/types';

 export const usePokemonsData = () => {
 const [results, setResults] = useState<PokemonDetails[]>([]);
 const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
 const [error, setError] = useState('');

 const getPokemons = async (term: string) => {
    setRequestStatus('loading');
    setError('');

    try {
      const names = await pokeApiService.getBySearchTerm(term);
      const results = await pokeApiService.getPokemonDetails(names);
      setResults(results);
      setRequestStatus('success');
      setError('');
    } catch (error) {
      setError(getErrorMessage(error));
      setRequestStatus('error');
    }
  };
 return {getPokemons, results, requestStatus, error }
 }
 
