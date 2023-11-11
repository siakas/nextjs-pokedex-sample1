import { useEffect, useState } from 'react'
import axios from 'axios'
import { translateType } from '@/utils/types'
import type { PokemonDetail, SpeciesDetail } from '@/types/pokemon'

type Props = {
  pokemon: PokemonDetail
}

const Card = ({ pokemon }: Props) => {
  const [pokemonName, setPokemonName] = useState<string | undefined>('')

  // ポケモンの名前を日本語化して出力する関数
  const getJaPokemonName = async (url: string) => {
    try {
      const res = await axios.get<SpeciesDetail>(url)
      const result = res.data
      const jaName = result.names.find(
        (name) => name.language.name === 'ja-Hrkt'
      )?.name
      setPokemonName(jaName)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('データを取得できませんでした')
      }
      throw error
    }
  }

  useEffect(() => {
    void getJaPokemonName(pokemon.species.url)
  }, [])

  return (
    <div className="rounded-md border p-5">
      {pokemon.sprites.other?.['official-artwork'].front_default && (
        <div className="flex justify-center">
          <img
            src={pokemon.sprites.other?.['official-artwork'].front_default}
            alt=""
            loading="lazy"
            width={100}
            height={100}
          />
        </div>
      )}
      <h2 className="mt-2 text-center text-lg font-bold">{pokemonName}</h2>
      <ul className="mt-2 flex justify-center gap-2">
        {pokemon.types.map((i) => (
          <li
            key={i.slot}
            className={`rounded px-2 py-1 text-xs font-semibold text-white md:text-sm bg-${i.type.name}`}
          >
            {translateType(i.type.name)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Card
