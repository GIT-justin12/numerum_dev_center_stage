import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import ThemeButton from "./ThemeButton"


function Home() {
    const { theme } = useTheme()
  return (
    <>
    <div className={`navbar ${theme ? "bg-white text-black" : "bg-neutral text-white"} shadow-sm`}>
        <div className={`navbar-start ${ theme ? "text-black" : "text-white"}`}>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className={`menu menu-sm dropdown-content ${theme ? "bg-white text-black" : "bg-neutral text-white"} rounded-box 
                    z-1 mt-3 w-52 p-2 shadow`}>
                    <li><Link to="/" >Initialisation</Link></li>
                    <li><Link to="/todolist" >Todo List</Link></li>
                    <li><Link to="/articles" >Blog</Link></li>
                </ul>
            </div>
            <a className="btn btn-ghost text-xl">React</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li><Link to="/" >Initialisation</Link></li>
                <li><Link to="/todolist" >Todo List</Link></li>
                <li><Link to="/articles" >Blog</Link></li>
            </ul>
        </div>
        <ThemeButton />
    </div>
    </>
  )
}

export default Home
