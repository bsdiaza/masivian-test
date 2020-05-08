import cluster from 'cluster'
import http from 'http'
import App from './src/app'

const app = new App()

export function initLoadBalancer(){
  const numCPUs = require('os').cpus().length;

  console.log(`Master ${process.pid} is running`);
  
  for (let i = 0; i < numCPUs; i++) 
    cluster.fork();
  
  cluster.on('exit', (worker: cluster.Worker, code: number, signal:string) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}

export function createChildProcess(port: number){
  http.createServer(app.app).listen(port);
  console.log(`Worker ${process.pid} started`);
}
