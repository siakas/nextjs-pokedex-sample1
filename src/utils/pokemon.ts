import axios from 'axios'
import type { PokemonDetail, PokemonListResponse } from '@/types/pokemon'

export const getAllPokemon = async (url: string) => {
  try {
    const response = await axios.get<PokemonListResponse>(url)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('データを取得できませんでした')
    }
    throw error
  }
}

export const getPokemon = async (url: string) => {
  try {
    const response = await axios.get<PokemonDetail>(url)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('データを取得できませんでした')
    }
    throw error
  }
}

export const getPokemonAbilites = async (url: string) => {
  return await new Promise((resolve, reject) => {
    void fetch(url)
      .then(async (res) => await res.json())
      .then((data) => {
        resolve(data)
      })
  })
}
