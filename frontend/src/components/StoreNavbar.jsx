import React from 'react'
import { Link } from 'react-router-dom'


const StoreNavbar = () => {
  return (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to='/store'></Link>
                </li>
                <li>
                    <Link to='/cart'></Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default StoreNavbar
