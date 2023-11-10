import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${openSans.className}`}>
      <h1>Hello World</h1>
    </main>
  )
}
