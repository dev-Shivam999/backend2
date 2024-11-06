import express from 'express';
import cluster from 'cluster'
import os from 'os'

const totalCpus=os.cpus().length;
const PORT = 3000;

if (cluster.isPrimary) {
console.log(`totalCpus: ${totalCpus}`);

    for (let i = 0; i < totalCpus; i++) {

        cluster.fork()

    }
    cluster.on("exit",(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} is running`);
        cluster.fork();
        
    })
    
}
else{
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({lol:process.pid})
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
}
