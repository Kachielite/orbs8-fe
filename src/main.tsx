import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import {configureAuthContainer} from "@/core/init-dependencies/auth.dependency";

// Initialize dependencies
configureAuthContainer()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
