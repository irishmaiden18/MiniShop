import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-apowcvs8avleq487.us.auth0.com"
      clientId="tqTwzUgZLrDOYbdXfBEzfVKaKcAqcYvq"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>,
)
