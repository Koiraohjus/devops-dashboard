import axios from 'axios'
import { useEffect, useState } from 'react'

interface Repo {
  name: string
  stars: number
  forks: number
}

interface Commit {
  message: string
  author: string
}

function App() {
  const [repo, setRepo] = useState<Repo | null>(null)
  const [commits, setCommits] = useState<Commit[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/github/repo')
      .then(response => {
        setRepo(response.data)
      })
    axios
      .get('http://localhost:3001/api/github/commits')
      .then(response => {
        setCommits(response.data)
      })
  }, [])

  if (!repo) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>DevOps Dashboard</h1>
      <h2>Repository</h2>
      <p>Name: {repo.name}</p>
      <p>Stars: {repo.stars}</p>
      <p>Forks: {repo.forks}</p>
      <h2>Recent comments</h2>
     {commits.map(commit => (
      <div key={commit.message}>
        <p>{commit.message}</p>
        <p>Author: {commit.author}</p>
      </div>
      ))}
    </div>
  )
}

export default App