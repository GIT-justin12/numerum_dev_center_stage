import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Home() {
    const auth = useAuth();
  return (
    <>
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link to="/" >Initialisation</Link></li>
                    <li><Link to="/articles" >Articles</Link></li>
                    {
                        auth.user && (
                            <>
                                <li><Link to="/todolist" >Todo List</Link></li>
                            </>
                        )
                    }
                </ul>
                </div>
                <a className="btn btn-ghost text-xl">React pratiques</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" >Initialisation</Link></li>
                    <li><Link to="/articles" >Articles</Link></li>
                    {
                        auth.user && (
                            <>
                                <li><Link to="/todolist" >Todo List</Link></li>
                            </>
                        )
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {auth.user ?(
                    <div className="flex md:flex-row flex-col items-center">
                        <div>
                            <button className="btn btn-ghost ml-2" onClick={() => auth.logout()}>Déconnexion</button>
                        </div>
                        <div className="avatar avatar-online avatar-placeholder">
                            <div className="bg-neutral text-neutral-content w-12 rounded-full">
                                <span className="text-sm">User</span>
                            </div>
                        </div>
                    </div>
                ):
                (<Link to="/login" >
                    <span className="btn">Connexion</span>
                </Link>
                )}
            </div>
        </div>
    </>
  )
}

export default Home
