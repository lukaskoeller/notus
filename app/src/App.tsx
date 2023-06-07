import styles from './App.module.css';
import { Aside } from './components/Aside/Aside';
import { Main } from './components/Main/Main';

function App() {

  return (
    <div className={styles.grid}>
      <Aside />
      <Main />
    </div>
  )
}

export default App
