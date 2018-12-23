var forever = require('forever-monitor')

var child = new forever.Monitor('src/index.ts', {
  max: 15,
  silent: true,
  args: [],
  command: 'ts-node',
  minUptime: 2000,
  spinSleepTime: 100000
})

child.on('exit', function() {
  console.log('process exited after 15 restarts')
})

child.start()
