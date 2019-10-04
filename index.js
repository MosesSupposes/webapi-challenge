const express = require('express')
const projectsRouter = require('./routes/projects')
const actionsRouter = require('./routes/actions')

const server = express()

server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.listen(5000, () => console.log('server running on port 5000'))