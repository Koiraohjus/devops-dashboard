import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/health')
      .then(response => {
        setStatus(response.data.status)
      })
  }, [])

  

  return (
    <div>
      <h1>DevOps Dashboard</h1>
      <p>Backend status: {status}</p>
    </div>
  )
}

export default App