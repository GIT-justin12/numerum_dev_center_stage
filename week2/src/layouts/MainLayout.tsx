import Header from '../components/Header'
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <>
      <div className="mockup-browser border-base-300 border w-full">
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  )
}
export default MainLayout
