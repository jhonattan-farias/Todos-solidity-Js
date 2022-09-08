import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'

import{ ethers } from 'ethers'
import { abi } from '../../Blockchain/artifacts/contracts/Todolist.sol/Todolist.json'

interface TaskProps {
  id:number;
  task:string;
  isCompleted:boolean;
}

type ContractFunctionsTypes = 'addTodo' | 'getTodos' | 'completeTodos';

const Home: NextPage = () => {
  const [inputTask,setInputTask] = useState('')
  const [connectedAddress,setConnectedAccount] = useState('')
  const [tasks,setTasks] = useState<TaskProps[]>([])
  let provider:ethers.providers.Web3Provider;
  
  async function connectWallet() {
    try{
      if(provider){
        await provider.send('eth_requestAccounts',[])
        const signer = provider.getSigner()
        setConnectedAccount(await signer.getAddress())
      }
    } catch(err) {
      console.log(err)
    }
  }

  async function connectContract(caller:ContractFunctionsTypes = 'addTodo') {
    const signer = provider.getSigner()
    console.log(provider)
    try{
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
      const contract = new ethers.Contract(contractAddress,abi,signer)
      const response = await contract.addTodo('carro 1')
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  }

  function addTask(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
    connectContract()
    if(inputTask === '') return;
    setTasks([...tasks,{ 
        task: inputTask, 
        id: tasks.length++, 
        isCompleted: true
      }])
    setInputTask('')
  }

  useEffect(() => {
    const button = document.getElementsByClassName('connectWalletButton')[0] as HTMLButtonElement
    const { ethereum }:any = window;

    if(!ethereum){
      button.innerText = 'Install Metamask'
    }

    const newProvider = new ethers.providers.Web3Provider(ethereum)
    provider = newProvider
  },[])
  
  return (
    <>
    <Head>
      <title>
        Create Todos
      </title>
    </Head>

      <div className={styles.header}>
        <div className={styles.create}>
          <h1>Create your tasks!</h1>
        </div>

        <div className={styles.connectWallet}>
          <button 
            className='connectWalletButton' 
            onClick={connectWallet}
          >
            {connectedAddress === '' ? 'Connect Wallet' : connectedAddress.slice(0,5) + '...' + connectedAddress.slice(connectedAddress.length -4)}
          </button>
        </div>
      </div>

      <div className={styles.createTask}>
        <form 
          onSubmit={(event) => {
            addTask(event)
          }}
        >
          <input 
            type="text" 
            onChange={({ target }) => {
              setInputTask(target.value);
            }} 
            value={inputTask}
          />
          <button>Create</button>
        </form>
      </div>

      <div className={styles.tasks}>
        <ul>
          { tasks.map(({ isCompleted, task, id }) => (
            <li
              key={id} 
              className={styles.task}
            >
              <strong>{task}</strong>
              { isCompleted ? 'Completed' : <button>Completed</button> }
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Home
