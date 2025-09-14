import './App.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const element = useRoutes(routes)

  return (
    <>
      <ThemeProvider>
        {element}
      </ThemeProvider>
    </>
  )
}

export default App
