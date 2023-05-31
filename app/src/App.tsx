import { useState } from 'react'
import reactLogo from './assets/react.svg'
import styles from './App.module.css';
import { Aside } from './components/Aside/Aside';

function App() {

  return (
    <div className={styles.grid}>
      <Aside>
        aside
      </Aside>
      <main className={styles.main}>
        Main
      </main>
    </div>
  )
}

export default App
