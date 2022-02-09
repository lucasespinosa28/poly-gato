import './App.css'
import { Routes, Route } from 'react-router-dom'
import Menu from './components/menu'
import Home from './components/home'
import Combine from './components/combine'
import Collection from './components/collection'


function App() {
  return (
    <div className=' grid justify-items-center'>
      <div className="text-slate-50  w-6/12 content-center">
        <Menu />
        <div className=" content-center my-4 ">
          <Routes>
              <Route path="/poly-gato/*" element={<Home />} />
              <Route path="/poly-gato/combine" element={<Combine />} />
              <Route path="/poly-gato/collection" element={<Collection />} />
          </Routes>     
        </div>
      </div>
    </div>
  )
}

export default App
