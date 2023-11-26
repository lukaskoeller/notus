import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import styles from './App.module.css';
import { Main } from './components/Main/Main';
import { EditorProvider } from './contexts/editor';
import { Root } from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
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
