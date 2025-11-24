const fs = require('fs')
const { Transform } = require('stream')

const filterErrors = new Transform({
    transform(chunk, encoding, callback) {
        const filteredData = chunk
        .toString('utf8')
        .split('\n')
        .filter(line => !line.includes('ERROR'))
        .join('\n')

        this.push(filteredData)
        callback()
    }
})

fs.createReadStream(`static/logs.txt`)
.pipe(filterErrors)
.pipe(fs.createWriteStream('static/filtered-logs.txt'))
.on('finish', () => console.log('Filtered logs written successfully.'));
