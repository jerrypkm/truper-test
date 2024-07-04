import { PokemonResponse } from "@/interfaces/pokemon"
import { SinglePokemon } from "@/interfaces/singlePokemon"

export const getPokemons = async (): Promise<PokemonResponse> => {
  const response: PokemonResponse =  await fetch('https://pokeapi.co/api/v2/pokemon', {
    method: 'GET'
  }).then(res => res.json())

  return response
}

export const getSinglePokemon = async (url: string): Promise<SinglePokemon> => { 
  const response: SinglePokemon = await fetch(url, {
    method: 'GET'
  }).then(res => res.json())

  return response
}