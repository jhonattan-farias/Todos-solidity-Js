import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [inputTask,setInputTask] = useState('')

  async function connectWallet() {
    const { ethereum } = window;

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
          <li className={styles.task}>
            task 
            <button>Completed</button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Home
