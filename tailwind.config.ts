import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        normal: '#aeaeae',
        fighting: '#ee6969',
        flying: '#64a7f1',
        poison: '#ab7aca',
        ground: '#c8a841',
        rock: '#fac727',
        bug: '#51cb5a',
        ghost: '#756eb4',
        steel: '#818aa4',
        fire: '#ffa766',
        water: '#64c5f7',
        grass: '#9ac30e',
        electric: '#e7d400',
        psychic: '#eb7ff4',
        ice: '#60e9f5',
        dragon: '#ff8859',
        dark: '#6881d4',
        fairy: '#fc7799',
      },
    },
  },
  safelist: [
    'bg-normal',
    'bg-fighting',
    'bg-flying',
    'bg-poison',
    'bg-ground',
    'bg-rock',
    'bg-bug',
    'bg-ghost',
    'bg-steel',
    'bg-fire',
    'bg-water',
    'bg-grass',
    'bg-electric',
    'bg-psychic',
    'bg-ice',
    'bg-dragon',
    'bg-dark',
    'bg-fairy',
  ],
  plugins: [],
}
export default config
