 import {useState, useCallback} from 'react';
 import { pokeApiService } from '@service/pokeApiService';
 import getErrorMessage from '@utils/getErrorMessage';
 import type { RequestStatus } from '@utils/types';
import type { PokemonByNameResponse } from '../api/pokemonApiTypes';

 export const usePokemonsData = () => {
 const [results, setResults] = useState<PokemonByNameResponse[]>([]);
 const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
 const [error, setError] = useState('');

 const getPokemons = useCallback( async (term: string, page: number) => {
    setRequestStatus('loading');
    setError('');

    try {
      const names = await pokeApiService.getBySearchTerm(term, page);
      const results = await pokeApiService.getPokemonDetails(names);
      setResults(results);
      setRequestStatus('success');
    } catch (error) {
      setError(getErrorMessage(error));
      setRequestStatus('error');
    }
  }, [])

 return {getPokemons, results, requestStatus, error }
 }
 
