import cluster from 'cluster'
import { initLoadBalancer, createChildProcess } from './scalability'

function scaleApp(){
  if (cluster.isMaster) 
    initLoadBalancer()
  else 
    createChildProcess()
}

scaleApp()