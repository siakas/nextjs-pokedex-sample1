export const typeMapping = {
  normal: 'ノーマル',
  fighting: 'かくとう',
  flying: 'ひこう',
  poison: 'どく',
  ground: 'じめん',
  rock: 'いわ',
  bug: 'むし',
  ghost: 'ゴースト',
  steel: 'はがね',
  fire: 'ほのお',
  water: 'みず',
  grass: 'くさ',
  electric: 'でんき',
  psychic: 'エスパー',
  ice: 'こおり',
  dragon: 'ドラゴン',
  dark: 'あく',
  fairy: 'フェアリー',
}

type EnglishType = keyof typeof typeMapping

export const translateType = (type: EnglishType) => {
  return typeMapping[type]
}
