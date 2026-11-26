const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/api/github/repo', async (req, res) => {
  res.json({  
    name: 'devops-dashbord',
    stars: 0,
    forks: 0
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})