const receiver = require('./Listener/Server')
const clientListener = require('./Listener/Client')
const powerTask = require('./Tasks/PowerTest')
module.exports = { receiver, clientListener, tasks: { powerTask } }
