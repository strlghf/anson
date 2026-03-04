import { useEffect, useState } from "react"

export function useFetch ({ url }) {
  const [data, setData] = useState({
    id: "",
    name: "",
    age: ""
  })

  useEffect(() => {
    let ignore = false

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!ignore) {
          setData(data)
        }
      })

    return () => ignore = true
}, [url])

  return { data, setData }
}
