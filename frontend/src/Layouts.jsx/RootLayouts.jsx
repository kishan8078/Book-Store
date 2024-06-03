import React ,{useState , createContext} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../css/RootLayoutsCSS.css'


function RootLayouts({loggedIn}) {
  
  return (
    
    <div>
        {loggedIn ? 
        <header>
            <nav>
                <ul class="left">
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                </ul>
                <ul class="right">
                    <li>
                        <NavLink to='login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='register'>Register</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        :
        <header>
            <nav>
                <ul class="left">
                    <li>
                        <NavLink to='store'>Store</NavLink>
                    </li>
                </ul>
                <ul class="right">
                    <li>
                        <NavLink to='cart'>Cart</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        }

        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayouts
