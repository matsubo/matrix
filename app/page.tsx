import MatrixRain from "./components/MatrixRain"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="sr-only">Matrix Code</h1>
      <MatrixRain />
    </main>
  )
}

