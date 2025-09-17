import Header from '../components/Header'
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
  
      <div className="mockup-browser w-full md:h-full bg-white text-black">
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
    
    
  )
}
export default MainLayout
