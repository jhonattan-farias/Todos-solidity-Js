import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.create}>
          <h1>Create your tasks!</h1>
        </div>

        <div className={styles.connectWallet}>
          <button>Connect Wallet</button>
        </div>
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
