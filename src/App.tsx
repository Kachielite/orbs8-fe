import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 24 }}>
      <h1>Vite + React + TypeScript</h1>
      <p>Alias test: importing from @/ works!</p>
      <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
    </div>
  )
}
