import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

import {Toaster} from 'react-hot-toast'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <App />
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
    
  </React.StrictMode>
)
