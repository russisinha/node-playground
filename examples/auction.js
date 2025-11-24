const EventEmitter = require('events');

const auction = new EventEmitter();

auction.once('start', (itemName) => {
    console.log(`The auction for ${itemName} has started!`)
});
auction.once('end', () => {
    console.log(`The auction has ended!`)
});
auction.on('logBidders', () => {
    console.log(`Active bidders: ${auction.listenerCount('bid')}`)
})

let biddersList = new Set()
function createBidder(name) {
    const bidListener = (bidderName, amount) => {
        if(name !== bidderName) {
            console.log(`${name} hears that ${bidderName} has bid $${amount}`)
        }
    }
    if (!biddersList.has(name)) {
        biddersList.add(name)
        auction.on(`bid`, bidListener);
    }
    const placeBid = (amount) => {
        console.log(`${name} bids $${amount}`)
        auction.emit('logBidders')
        auction.emit(`bid`, name, amount);
    }
    const withdraw = () => {
        auction.removeListener('bid', bidListener)
        biddersList.delete(name)
        console.log(`${name} has withdrawn from the auction.`)
        auction.emit('logBidders')
    }
    return { placeBid, withdraw }
}


// Start the auction
auction.emit('start', 'Antique Vase');

// Participants join
// `createBidder` sets up a participant to join the auction, place bids, and withdraw.

const alice = createBidder('Alice');
const bob = createBidder('Bob');
const charlie = createBidder('Charlie');

// Place bids
alice.placeBid(100);
bob.placeBid(150);

charlie.placeBid(200);

// Withdraw
charlie.withdraw();

// Continue bidding
alice.placeBid(250);
bob.placeBid(300);

// End the auction
auction.emit('end');