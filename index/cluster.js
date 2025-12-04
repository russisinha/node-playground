import { createServer } from 'http'
import { cpus } from 'os'
import cluster from 'cluster'

if (cluster.isPrimary) {
    const availableCpus = cpus()
    console.log(`Clustering to ${availableCpus.length} processes`)
    availableCpus.forEach(() => cluster.fork())
}
else {
    const { pid } = process
    const server = createServer((req, res) => {
        // simulates CPU intensive work
        let i = 10000;
        console.log(`Handling request from ${pid}`)
        while (i > 0) {
            // console.log(i)
            res.write(i.toString())
            i--
        }
        console.log(`Handling request from ${pid}`)
        res.end(`Hello from ${pid}\n`)
    })
    server.listen(3000, () => console.log(`Started at ${pid}`))

}

