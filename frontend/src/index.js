import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Home from './page/Home';
import Menu from './page/Menu';
import About from './page/About';
import ContactUs from './page/ContactUs';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
          <Route index element={<Home/>}/>
          <Route path='menu' element={<Menu/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='contact' element={<ContactUs/>}/>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <RouterProvider router={router}/>
);

reportWebVitals();
