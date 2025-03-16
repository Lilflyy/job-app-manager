import AuthPage from './pages/AuthPage';
import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from "react-helmet";
import DashBoard from './pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <HashRouter>
    <div className="App">
    <Helmet>
       <meta charSet="utf-8" />
        <title>Porfolio</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
        <Routes>
          <Route path='/' element={<AuthPage/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
        </Routes>

      
    </div>
    
     </HashRouter>
    
    
    
  );
}

export default App;
