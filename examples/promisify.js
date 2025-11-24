const fs = require('fs')
const path = require('path')

function customPromisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject)=> {
            fn(...args, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
        })
    }
}

const readFileAsync = customPromisify(fs.readFile)

async function readFile() {
    try {
        const directory = './static';
        const fileName = 'test.txt';
        const filePath = path.join(directory, fileName);
        console.log(filePath)
        const data = await readFileAsync(filePath, 'utf8')
        console.log(data)
    } catch(err) {
        console.log(err)
    }
}

readFile()