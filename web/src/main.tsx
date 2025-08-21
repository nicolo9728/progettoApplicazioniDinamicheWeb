import "reflect-metadata"
import { createRoot } from 'react-dom/client'
import {  BrowserRouter, Route, Routes } from 'react-router'
import {Login} from "./pages/login/login"
import "./index.css"

createRoot(document.getElementById('root')!).render(
    (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    )
)
