import cluster from 'cluster';
import os from 'os';
const cpus = os.cpus().length;
console.log(cpus);

// Cluster - Verifica se é o processo primário se não for, então é um worker
if(cluster.isPrimary){
  console.log(`Primary ${process.pid} is running`);
  // Fork workers
  for(let i = 0; i < cpus; i++){
    cluster.fork();
  }
  cluster.on('exit',(worker,code,signal)=>{
    console.log(`Worker ${worker.process.pid} died`);
  });
}else{
  console.log(`Worker ${process.pid} started`);
}