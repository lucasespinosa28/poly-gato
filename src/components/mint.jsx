import { useWeb3Contract } from "react-moralis";
import metadata from '../contract/randomNft_metadata.json'
import { useMoralis } from 'react-moralis'
import Login from "./login";
import { Error, Transaction } from './alerts';
import { Link } from 'react-router-dom'

function Mint(){
  const { isWeb3Enabled } = useMoralis();
  const { data, error, runContractFunction, isFetching } =
    useWeb3Contract({
      abi: metadata.output.abi,
      contractAddress: "0xb3210fed6d4659c10f39a0a6342287a0a8895ffc",
      functionName: "MintRandom",
    });
  
    if(!isWeb3Enabled) return <Login />;
    return (
      <div className="flex flex-col">
        <button 
          className='text-2xl p-2 mx-32 hover:bg-lime-500 my-4 bg-lime-400 border-b-4 border-lime-600 outline outline-offset-2 outline-1'
          onClick={() => runContractFunction()} 
          disabled={isFetching}
          >
          <span className='text-slate-800 mx-2'>Mint your nft</span>
        </button>
        {error && <Error data={error} />}
        {data && 
          <div className="mx-16 mb-4 flex flex-col">
            <p className="w-full font-bold">It may take a few minutes for the contract to mint a random NFT,because it needs a random number to be given by the chainlink VRF</p>
            <Transaction data={data.hash} />
            <Link className='font-bold underline hover:text-lime-400' to="/combine">After some minutes see your transaction here</Link>
          </div>}
      </div>
    );
}
export default Mint
