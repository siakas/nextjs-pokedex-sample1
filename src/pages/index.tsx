import { useEffect, useState } from 'react'
import { chunk } from 'lodash-es'
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

  // コンポーネントがマウントされた時、または pokeApiUrl が変更された時に実行される
  useEffect(() => {
    // ポケモンのリストを非同期で取得し、状態を更新する関数
    const fetchPokemonList = async () => {
      try {
        const res = await getAllPokemon(pokeApiUrl) // ポケモンAPIからデータを取得
        const detailedPokemonData = await fetchPokemonDetailsInBatches(
          res.results
        )

        // バッチ処理を使って詳細データを取得
        setPokemonData(detailedPokemonData) // ポケモンのデータを状態にセット
        setNavigationUrls(res.next, res.previous) // ナビゲーションURLを更新
      } catch (error) {
        console.error('Error fetching Pokémon data:', error) // エラー発生時の処理
      } finally {
        setLoading(false) // ローディング状態を終了
      }
    }

    void fetchPokemonList()
  }, [pokeApiUrl])

  const pokemonCache = new Map() // ポケモンデータのキャッシュを保持するMap

  // バッチ処理でポケモンの詳細情報を非同期に取得する関数
  const fetchPokemonDetailsInBatches = async (pokemonList: Pokemon[]) => {
    const batchSize = 10 // バッチのサイズを定義
    const pokemonChunks = chunk(pokemonList, batchSize) // リストをチャンクに分割

    const detailedPokemonData = await Promise.all(
      pokemonChunks.map(async (batch) => {
        const batchData = await Promise.all(
          batch.map(async (pokemon) => await fetchPokemonDetail(pokemon.url))
        )

        return batchData
      })
    )

    return detailedPokemonData.flat() // 取得したデータを平坦化して返す
  }

  // ポケモンの詳細情報を取得する関数。キャッシュに存在する場合はそれを使用
  const fetchPokemonDetail = async (url: string) => {
    if (pokemonCache.has(url)) {
      return pokemonCache.get(url) // キャッシュからデータを取得
    }

    const pokemonDetail = await getPokemon(url) // APIからデータを取得
    pokemonCache.set(url, pokemonDetail) // 取得したデータをキャッシュに保存

    return pokemonDetail
  }

  // 次ページと前ページのナビゲーションURLをセットする関数
  const setNavigationUrls = (next: string | null, previous: string | null) => {
    setNextUrl(next)
    setPrevUrl(previous)
  }

  // 前のページのポケモンデータを取得する関数
  const handlePrevPage = async () => {
    if (!prevUrl) return // 前のページがない場合は何もしない

    setLoading(true) // ローディング状態を開始
    try {
      const res = await getAllPokemon(prevUrl)
      const detailedPokemonData = await fetchPokemonDetailsInBatches(
        res.results
      )
      setPokemonData(detailedPokemonData)
      setNavigationUrls(res.next, res.previous)
    } catch (error) {
      console.error('Error fetching previous page Pokémon data:', error)
    } finally {
      setLoading(false) // ローディング状態を終了
    }
  }

  // 次のページのポケモンデータを取得する関数
  const handleNextPage = async () => {
    if (!nextUrl) return // 次のページがない場合は何もしない

    setLoading(true) // ローディング状態を開始
    try {
      const res = await getAllPokemon(nextUrl)
      const detailedPokemonData = await fetchPokemonDetailsInBatches(
        res.results
      )
      setPokemonData(detailedPokemonData)
      setNavigationUrls(res.next, res.previous)
    } catch (error) {
      console.error('Error fetching next page Pokémon data:', error)
    } finally {
      setLoading(false) // ローディング状態を終了
    }
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
