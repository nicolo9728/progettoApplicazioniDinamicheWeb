import "reflect-metadata"
import "tsyringe"
import { createRoot } from 'react-dom/client'
import {  BrowserRouter, Route, Routes } from 'react-router'
import {Login} from "./pages/login/login"
import "./index.css"
import { Homepage } from "./pages/login/homepage"

createRoot(document.getElementById('root')!).render(
    (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/home' element={<Homepage />}></Route>
        </Routes>
      </BrowserRouter>
    )
)
