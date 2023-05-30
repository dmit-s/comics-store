import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';

// Context Provider
import AppContextProvider from './context/AppContext.jsx';


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AppContextProvider>
//         <App />
//       </AppContextProvider> 
//     </BrowserRouter>
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider> 
  </BrowserRouter>,
)
