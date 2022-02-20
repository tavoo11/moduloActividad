const app = require('./configs/server')
const { port } = require('./configs/vars')

require('./configs/mongoose')

app.listen(port, () => console.log(`Server running on port: ${port}`))