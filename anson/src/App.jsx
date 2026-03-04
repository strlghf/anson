import { useState, useEffect } from 'react'
import './App.css'

const url = "http://localhost:5173/api/users"

function App() {
  const [people, setPeople] = useState(null)

  useEffect(() => {
    let ignore = false

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!ignore) {
          setPeople(data)
        }
      })

    return () => ignore = true
  }, [])

  return (
    <>
      <h1>{people}</h1>
    </>
  )
}

export default App
