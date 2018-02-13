const logger = require('@engine/logger')

const os = require('os')
const gauge = require('clui').Gauge
const pretty = require('pretty-bytes')

const total = os.totalmem()
const free = os.freemem()
const used = total - free
const human = pretty(free)

logger.info(`CPU:\t\t\tArch: ${os.arch()}, Cores: ${os.cpus().length}`)
logger.info(`Memory:\t\t${gauge(used, total, 20, total * 0.8, human + ' free')}`)
logger.info(`OS:\t\t\t${os.platform()} (${os.type()})`)
