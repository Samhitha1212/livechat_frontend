import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {store} from './app/store.js';
import { Provider } from 'react-redux';
import { SocketContextProvider } from './context/SocketContext.jsx';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <SocketContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </SocketContextProvider>
    </Provider>
  </React.StrictMode>,
)
