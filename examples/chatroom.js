
const EventEmitter = require('events');

const chat = new EventEmitter();
let usersList = []

chat.once('join', () => {
    console.log('Welcome to the chat! You are the first one here.');
});
chat.on('join', user => {
    console.log(`Logger: ${user} joined the chat`)    
})
function messageLogger(user, message) {
    console.log(`Logger: ${user} says: ${message}`)
}
chat.on('message', messageLogger)
chat.on('leave', user => {
    console.log(`Logger: ${user} left the chat`)
})
chat.on('error', errMessage => {
    console.log(errMessage)
})

chat.on('join', user => {
    if (usersList.indexOf(user) == -1) {
        usersList.push(user)
        console.log(`Notifier: Welcome ${user}! There are now ${usersList.length} user(s) in the chat.`)
    } else {
        chat.emit('error', `${user} already exists`)
    }
})
chat.on('message', (user, message) => {
    for(let usr of usersList) {
        if (user !== usr) {
            console.log(`[To ${usr}]: ${user} says: ${message}`)
        }
    }
})
chat.on('leave', user => {
    const userIndex = usersList.indexOf(user)
    if (userIndex >= 0) {
        usersList.splice(userIndex, 1)
    } else {
        chat.emit('error', `${user} does not exist`)
    }
})

chat.emit('join', 'Alice');
chat.emit('join', 'Bob');
chat.emit('join', 'Charlie');
chat.emit('message', 'Alice', 'Hello, everyone!');
chat.emit('message', 'Bob', 'Hello, everyone!');
chat.removeListener('message', messageLogger)
chat.emit('message', 'Charlie', 'Hello, everyone!');
chat.emit('leave', 'Alice');
chat.emit('join', 'Dave');
