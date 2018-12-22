var forever = require('forever-monitor')

var child = new forever.Monitor('src/index.ts', {
  max: 10,
  silent: true,
  args: [],
  command: 'ts-node',
  minUptime: 2000,
  spinSleepTime: 10000
})

child.on('exit', function() {
  console.log('process exited after 3 restarts')
})

child.start()
