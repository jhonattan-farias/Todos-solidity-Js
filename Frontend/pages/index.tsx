import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.scss'

interface TaskProps {
  id:number;
  task:string;
  isCompleted:boolean;
}

const tasks:TaskProps[] = [
  { id:0, task:'ler um livro', isCompleted:false },
  { id:1, task:'correr pela manhã', isCompleted:false },
  { id:2, task:'criar um contrato', isCompleted:true }
]

const Home: NextPage = () => {
  const [inputTask,setInputTask] = useState('')

  async function connectWallet() {
    const { ethereum }:any = window;

    if(!ethereum){
      console.log("Metamask is not instaled")
    }
    console.log(ethereum)
  }
  
  return (
    <>
      <div className={styles.header}>
        <div className={styles.create}>
          <h1>Create your tasks!</h1>
        </div>

        <div className={styles.connectWallet}>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      </div>

      <div className={styles.createTask}>
        <form 
          onSubmit={(event) => {
            event.preventDefault()
            setInputTask('')
          }}
        >
          <input 
            type="text" 
            onChange={({target}) => {
              setInputTask(target.value);
            }} 
            value={inputTask}
          />
          <button>Criar</button>
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
          )) }
        </ul>
      </div>
    </>
  )
}

export default Home
