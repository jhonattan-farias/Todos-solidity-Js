import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ButtonHTMLAttributes, FormEvent, HtmlHTMLAttributes, useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'

interface TaskProps {
  id:number;
  task:string;
  isCompleted:boolean;
}

const Home: NextPage = () => {
  const [inputTask,setInputTask] = useState('')
  const [tasks,setTasks] = useState<TaskProps[]>([])
  const [connectedAccount,setConnectedAccount] = useState('')

  async function connectWallet() {
    try{
      const button = document.getElementsByClassName('connectWalletButton')[0] as HTMLButtonElement
      const { ethereum }:any = window;
      
      if(!ethereum){
        button.innerText = 'Install Metamask'
      }

      await ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      setConnectedAccount(accounts[0])
      
    } catch(err) {
      console.log(err)
    }
  }

  function addTask(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if(inputTask === '') return;

    setTasks([...tasks,{ 
        task: inputTask, 
        id: tasks.length++, 
        isCompleted: false
      }])
    setInputTask('')
  }
  
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
            {connectedAccount === '' ? 'Connect Wallet' : connectedAccount.slice(0,9) + '...'}
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
