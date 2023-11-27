import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import styles from './App.module.css';
import { Main } from './components/Main/Main';
import { EditorProvider } from './contexts/editor';
import { Root } from "./routes/Root";
import { Start } from "./components/Start/Start";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Start />
      },
      {
        path: 'note/:noteTitle',
        element: <Main />,
      }
    ]
  },
]);

function App() {

  return (
    <div className={styles.grid}>
      <EditorProvider>
        <RouterProvider router={router} />
      </EditorProvider>
    </div>
  )
}

export default App
