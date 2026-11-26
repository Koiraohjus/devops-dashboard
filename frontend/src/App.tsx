import axios from 'axios'
import { useEffect, useState } from 'react'

interface Repo {
  name: string
  stars: number
  forks: number
}

function App() {
  const [repo, setRepo] = useState<Repo | null>(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/github/repo')
      .then(response => {
        setRepo(response.data)
      })
  }, [])

  if (!repo) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>DevOps Dashboard</h1>
      <p>Name: {repo.name}</p>
      <p>Stars: {repo.stars}</p>
      <p>Forks: {repo.forks}</p>
    </div>
  )
}

export default App