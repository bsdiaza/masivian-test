import cluster from 'cluster'
import { initLoadBalancer, createChildProcess } from './scalability'

const port = 3000

function scaleApp(){
  if (cluster.isMaster) 
    initLoadBalancer()
  else 
    createChildProcess(port)
  console.log('Server in port:', port)
}

scaleApp()