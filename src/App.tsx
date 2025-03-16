import AuthPage from './pages/AuthPage';
import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from "react-helmet";
import DashBoard from './pages/Dashboard';
import { AuthProvider } from './Provider/userContexProvider';

function App() {
  return (
    <HashRouter>
    <Helmet>
       <meta charSet="utf-8" />
        <title>Porfolio</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthPage/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
        </Routes>
      </AuthProvider>
      

    
     </HashRouter>
    
    
    
  );
}

export default App;
