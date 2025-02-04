import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Allroutes from './Allroutes';

function App() {
  return (
    <>
      <Router>
        <Toaster /> 
        <Allroutes />
      </Router>
    </>
  )
}

export default App
