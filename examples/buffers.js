const buffer = Buffer.alloc(30)
for (let i = 0; i < buffer.length; i++) {
    buffer[i] = Math.floor(Math.random() * 256)
}

console.log(buffer.toString('hex'))
function reverseBuffer(buffer) {
    const tempBuffer = Buffer.alloc(buffer.length)
    for (let i = 0; i < buffer.length; i++) {
        tempBuffer[i] = buffer[buffer.length - 1 - i]
    }
    return tempBuffer
}

const firstBuffer = reverseBuffer(buffer.slice(0, 10))
const middleBuffer = reverseBuffer(buffer.slice(10, 20))
const lastBuffer = reverseBuffer(buffer.slice(20, 30))

console.log(firstBuffer.toString('hex'))
console.log(middleBuffer.toString('hex'))
console.log(lastBuffer.toString('hex'))

const merged = Buffer.concat([firstBuffer, middleBuffer, lastBuffer])
console.log(merged.toString('hex'))
