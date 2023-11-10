import { useEffect, useState } from 'react'
import { Open_Sans } from 'next/font/google'
import { getAllPokemon, getPokemon } from '@/utils/pokemon'
import Card from '@/components/Card'
import type { Pokemon, PokemonDetail } from '@/types/pokemon'

const openSans = Open_Sans({ subsets: ['latin'] })

export default function Home() {
  const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=112&offset=0'
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState<PokemonDetail[]>([])
  // const [nextUrl, setNextUrl] = useState<string | null>('')
  // const [prevUrl, setPrevUrl] = useState<string | null>('')

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await getAllPokemon(pokeApiUrl)
        await loadPokemon(res.results)
        // setNextUrl(res.next)
        // setPrevUrl(res.previous)
      } catch (error) {
        console.error('Error fetching Pokémon data:', error)
      } finally {
        setLoading(false)
      }
    }

    void fetchPokemonData()
  }, [pokeApiUrl])

  const loadPokemon = async (data: Pokemon[]) => {
    try {
      const _pokemonData = await Promise.all(
        data.map(async (pokemon) => {
          const pokemonRecord = await getPokemon(pokemon.url)
          return pokemonRecord
        })
      )
      setPokemonData(_pokemonData)
    } catch (error) {
      console.error('Error loading Pokémon:', error)
    }
  }

  return (
    <main className={`p-10 ${openSans.className}`}>
      {loading ? (
        <>
          <p className="grid h-screen w-full place-items-center text-lg font-bold">
            データを読み込んでいます...
          </p>
        </>
      ) : (
        <>
          <div className="grid grid-cols-8 gap-4">
            {pokemonData.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}
