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
  const [nextUrl, setNextUrl] = useState<string | null>('')
  const [prevUrl, setPrevUrl] = useState<string | null>('')

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await getAllPokemon(pokeApiUrl) // ポケモン一覧情報を取得
        await loadPokemon(res.results) // 一覧で取得したポケモンごとの詳細情報を取得
        setNextUrl(res.next)
        setPrevUrl(res.previous)
      } catch (error) {
        console.error('Error fetching Pokémon data:', error)
      } finally {
        setLoading(false)
      }
    }

    void fetchPokemonData()
  }, [pokeApiUrl])

  // 一覧で取得したポケモンごとに詳細情報を取得して pokemonData に配列として格納
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

  // ページネーション用の関数を定義
  const handlePrevPage = async () => {
    if (!prevUrl) return false

    setLoading(true)
    const res = await getAllPokemon(prevUrl)
    await loadPokemon(res.results)
    setNextUrl(res.next)
    setPrevUrl(res.previous)
    setLoading(false)
  }
  const handleNextPage = async () => {
    if (!nextUrl) return false

    setLoading(true)
    const res = await getAllPokemon(nextUrl)
    await loadPokemon(res.results)
    setNextUrl(res.next)
    setPrevUrl(res.previous)
    setLoading(false)
  }

  return (
    <main className={`p-10 ${openSans.className}`}>
      {loading ? (
        <>
          <p className="grid w-full place-items-center text-lg font-bold">
            データを読み込んでいます...
          </p>
        </>
      ) : (
        <>
          <div className="join m-auto mb-20 grid max-w-xl grid-cols-2">
            {prevUrl && (
              <button
                className="btn btn-outline join-item"
                onClick={handlePrevPage}
              >
                前へ
              </button>
            )}
            {nextUrl && (
              <button
                className="btn btn-outline join-item"
                onClick={handleNextPage}
              >
                次へ
              </button>
            )}
          </div>

          <div className="grid grid-cols-8 gap-4">
            {pokemonData.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <div className="join m-auto mb-10 mt-20 grid max-w-xl grid-cols-2">
            {prevUrl && (
              <button
                className="btn btn-outline join-item"
                onClick={handlePrevPage}
              >
                前へ
              </button>
            )}
            {nextUrl && (
              <button
                className="btn btn-outline join-item"
                onClick={handleNextPage}
              >
                次へ
              </button>
            )}
          </div>
        </>
      )}
    </main>
  )
}
