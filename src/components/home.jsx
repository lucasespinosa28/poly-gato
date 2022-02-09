import Mint from './mint'
import { Link } from 'react-router-dom'

function Home(){
    return (
        <div className='text-center'>
            <h1 className="text-3xl font-bold text-center">Welcom to Random poly gatos</h1>
            <h2 className="text-2xl font-bold m-4">Random poly gatos are erc1155 NFT using chain link VRF to random mint 50 cats and 50 hoods different, after mint your NFT is possible to combine 2 NFTs and turn them into a new NFT.</h2>
            <h2 className="text-3xl font-bold text-center">How this works</h2>
            <p className="text-2xl font-bold m-4">Mint random cats and hoods after getting one type of each,  
            </p>
            <Link className='text-2xl font-bold m-4 font-bold underline hover:text-lime-400 my-2' to="/combine">go to Combine</Link>
            <div className='flex  justify-center'>
            <img className="max-w-[27em]" src="./0.png" alt="cat" />
                <img className="max-w-[5em]" src="./plus.svg" alt="green plus symbol" />
                <img className="max-w-[27em]" src="./54.png" alt="hood" />
                <img className="max-w-[5em]" src="./equal.svg" alt="green equal symbol" />
                <img className="max-w-[27em]" src="./5400.png" alt="cat with hood" />
            </div>
                <Mint />
        </div>
    )
}

export default Home
