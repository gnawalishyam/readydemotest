import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import App from './App'
import Finish from './Finish'
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(
    <BrowserRouter>
<Routes>
          <Route path="/" element={<App />} />
          <Route path="/finish" element={<Finish />} />
          </Routes>
 </BrowserRouter>
, document.getElementById('root'))
