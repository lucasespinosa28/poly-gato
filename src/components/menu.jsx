import { Link } from 'react-router-dom'

function Menu(){
    return (
        <nav className='flex text-2xl justify-center mt-4 bg-lime-400 border-b-4 border-lime-600 outline outline-offset-2 outline-1'>
            <Link className='min-w-[6em] text-slate-800 hover:text-slate-500' to="poly-gato">Home</Link>
            <Link className='min-w-[6em] text-slate-800 hover:text-slate-500' to="poly-gato/combine">Combine</Link>
            <Link className='min-w-[6em] text-slate-800 hover:text-slate-500' to="poly-gato/collection">Collection</Link>
        </nav>
    )
}


export default Menu
