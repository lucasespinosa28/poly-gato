import React from 'react';
import { useNFTBalances } from "react-moralis";
import { RenderNft } from './RenderNft';
import { useForm } from "react-hook-form";
import { useWeb3Transfer, useMoralis } from "react-moralis";
import Login from "./login";
import { Error } from './alerts';

const token_address = "0xb3210fed6d4659c10f39a0a6342287a0a8895ffc";

function TransferNft(nft){
    const { register, handleSubmit,watch, formState: { errors } } = useForm();
    const {fetch, error} = useWeb3Transfer({
        amount: watch("amount"),
        receiver: watch("address"),
        type: "erc1155",
        tokenId:nft.nft,
        contractAddress: token_address,
      });
    const onSubmit = data => { 
        fetch();
    }

    return (  
        <form onSubmit={handleSubmit(onSubmit)}>     
        {errors.exampleRequired && <span>This field is required</span>}
        <input placeholder='Address' className='w-[200px] p-2 m-2 bg-slate-50 text-slate-900' {...register("address", { required: true })} />
        <input placeholder='Amount' className='w-[200px] p-2  m-2 bg-slate-50 text-slate-900' {...register("amount", { required: true })} />
        <button
          className='hover:bg-lime-500 w-[200px] m-2 text-slate-900 my-4 bg-lime-400 border-b-4 border-lime-600 outline outline-offset-2 outline-1' 
          type='submit'>
          Transfer
          </button>
        {error && <Error data={error} />}
        </form>
    );
}
function Collection(){
    const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
    const { isWeb3Enabled } = useMoralis();
    console.log(isWeb3Enabled)
    const NFTBalances = () => {
      if(!isWeb3Enabled) return <Login />;
      if(isLoading) return <p>Loading...</p>;
      if(isFetching) return <p>Fetching...</p>;
        return (
          <div>
            {error && <Error data={error} />}
            <div
              className='bg-orange-400 hover:bg-orange-500 border-b-4 border-orange-600 outline outline-offset-2 outline-1 cursor-pointer' 
              onClick={() => getNFTBalances()}>
              <div className='text-slate-800 mx-2 text-center'>
                Refetch NFTBalances
              </div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
            {data && data.result.map((element) => {
              console.log(element.token_address)
              if(token_address === element.token_address){
                console.log(true)
                return (
                          <div>
                            <RenderNft data={{id:element.token_id,amount:element.amount}}/>
                            <TransferNft nft={element.token_id}/>
                          </div>
                    )
                  }
                })}
              </div>
          </div>
        );
      };
    return (
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-center'>Collection</h1>
        <p className='text-2xl font-bold m-4'>Every cat and hood you have.</p>
        <NFTBalances/>
      </div>
      )
}



export default Collection
