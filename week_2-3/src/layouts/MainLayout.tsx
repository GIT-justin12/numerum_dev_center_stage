import Header from '../components/Header'
import { Outlet } from "react-router-dom"
import { useTheme } from '../context/ThemeContext'

function MainLayout() {
const { theme } = useTheme()
  return (
  
      <div className={`mockup-browser w-full md:h-full ${ theme ? "bg-white text-black" : "bg-neutral text-white"}`}>
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
    
    
  )
}
export default MainLayout
