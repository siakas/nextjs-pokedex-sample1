export type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export type Pokemon = {
  id?: number
  name: string
  url: string
  image?: string
}

export type PokemonDetail = {
  abilities: Ability[]
  base_experience: number
  forms: Form[]
  game_indices: GameIndex[]
  height: number
  held_items: any[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  past_abilities: any[]
  past_types: any[]
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

export type Ability = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export type Form = {
  name: string
  url: string
}

export type GameIndex = {
  game_index: number
  version: {
    name: string
    url: string
  }
}

export type Move = {
  move: {
    name: string
    url: string
  }
  version_group_details: VersionGroupDetail[]
}

export type VersionGroupDetail = {
  level_learned_at: number
  move_learn_method: {
    name: string
    url: string
  }
  version_group: {
    name: string
    url: string
  }
}

export type Species = {
  name: string
  url: string
}

export type Sprites = {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
  other?: {
    dream_world: {
      front_default: string | null
      front_female: string | null
    }
    home: {
      front_default: string | null
      front_female: string | null
      front_shiny: string | null
      front_shiny_female: string | null
    }
    'official-artwork': {
      front_default: string | null
      front_shiny: string | null
    }
  }
  versions?: {
    'generation-i': {
      'red-blue': {
        back_default: string | null
        back_gray: string | null
        back_transparent: string | null
        front_default: string | null
        front_gray: string | null
        front_transparent: string | null
      }
      yellow: {
        back_default: string | null
        back_gray: string | null
        back_transparent: string | null
        front_default: string | null
        front_gray: string | null
        front_transparent: string | null
      }
    }
    'generation-ii': {
      crystal: {
        back_default: string | null
        back_shiny: string | null
        back_shiny_transparent: string | null
        back_transparent: string | null
        front_default: string | null
        front_shiny: string | null
        front_shiny_transparent: string | null
        front_transparent: string | null
      }
      gold: {
        back_default: string | null
        back_shiny: string | null
        front_default: string | null
        front_shiny: string | null
        front_transparent: string | null
      }
      silver: {
        back_default: string | null
        back_shiny: string | null
        front_default: string | null
        front_shiny: string | null
        front_transparent: string | null
      }
    }
    'generation-iii': {
      emerald: {
        front_default: string | null
        front_shiny: string | null
      }
      'firered-leafgreen': {
        back_default: string | null
        back_shiny: string | null
        front_default: string | null
        front_shiny: string | null
      }
      'ruby-sapphire': {
        back_default: string | null
        back_shiny: string | null
        front_default: string | null
        front_shiny: string | null
      }
    }
    'generation-iv': {
      'diamond-pearl': {
        back_default: string | null
        back_female: string | null
        back_shiny: string | null
        back_shiny_female: string | null
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
      'heartgold-soulsilver': {
        back_default: string | null
        back_female: string | null
        back_shiny: string | null
        back_shiny_female: string | null
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
      platinum: {
        back_default: string | null
        back_female: string | null
        back_shiny: string | null
        back_shiny_female: string | null
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
    }
    'generation-v': {
      'black-white': {
        animated: {
          back_default: string | null
          back_female: string | null
          back_shiny: string | null
          back_shiny_female: string | null
          front_default: string | null
          front_female: string | null
          front_shiny: string | null
          front_shiny_female: string | null
        }
        back_default: string | null
        back_female: string | null
        back_shiny: string | null
        back_shiny_female: string | null
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
    }
    'generation-vi': {
      'omegaruby-alphasapphire': {
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
      'x-y': {
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
    }
    'generation-vii': {
      icons: {
        front_default: string | null
        front_female: string | null
      }
      'ultra-sun-ultra-moon': {
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
    }
    'generation-viii': {
      icons: {
        front_default: string | null
        front_female: string | null
      }
    }
  }
}

export type Stat = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export type Type = {
  slot: number
  type: {
    name: string
    url: string
  }
}
