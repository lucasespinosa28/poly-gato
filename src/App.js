import './App.css'
import { Routes, Route } from 'react-router-dom'
import Menu from './components/menu'
import Home from './components/home'
import Combine from './components/combine'
import Collection from './components/collection'


function App() {
  return (
    <div className='grid justify-items-center'>
      <div className="text-slate-50  w-6/12 content-center">
        <Menu />
        <div className="bg-stone-800 content-center my-4 rounded-sm outline outline-offset-2 outline-1">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/combine" element={<Combine />} />
              <Route path="/collection" element={<Collection />} />
          </Routes>     
        </div>
      </div>
    </div>
  )
}

export default App
