import styles from './App.module.css';
import { Aside } from './components/Aside/Aside';
import { Main } from './components/Main/Main';
import { EditorProvider } from './contexts/editor';

function App() {

  return (
    <div className={styles.grid}>
      <EditorProvider>
        <Aside />
        <Main />
      </EditorProvider>
    </div>
  )
}

export default App
