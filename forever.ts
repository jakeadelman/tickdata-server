var forever = require('forever-monitor')

var child = new forever.Monitor('src/index.ts', {
  max: 3,
  silent: true,
  args: [],
  command: 'ts-node'
})

child.on('exit', function() {
  console.log('process exited after 3 restarts')
})

child.start()
