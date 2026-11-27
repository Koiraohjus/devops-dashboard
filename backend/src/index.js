const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/api/github/repo', async (req, res) => {
  const response = await fetch(
    'https://api.github.com/repos/Koiraohjus/devops-dashboard'
  )

  const data = await response.json()

  res.json({  
    name: data.name,
    stars: data.stargazers_count,
    forks: data.forks_count
  })
})

app.get('/api/github/commits', async (req, res) => {
  const response = await fetch(
    'https://api.github.com/repos/Koiraohjus/devops-dashboard/commits'
  )

  const data = await response.json()

  const commits = data.slice(0, 5).map(commit => ({
    sha: commit.sha,
    message: commit.commit.message,
    author: commit.commit.author.name
  }))

  res.json(commits)
})

app.get('/api/github/actions', async (req, res) => {
  const response = await fetch(
    'https://api.github.com/repos/Koiraohjus/devops-dashboard/actions/runs'
  )

  const data = await response.json()

  if (data.workflow_runs.length === 0) {
    return res.json({
      status: 'no workflows',
      conclusion: 'none'
    })
  }

  const latestRun = data.workflow_runs[0]

  res.json({
    status: latestRun.status,
    conclusion: latestRun.conclusion
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})