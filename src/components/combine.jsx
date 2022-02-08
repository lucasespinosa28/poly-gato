/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { RenderNft } from './RenderNft';
import { useWeb3Contract, useMoralis,useNFTBalances } from "react-moralis";
import metadata from '../contract/randomNft_metadata.json'
import { useForm } from "react-hook-form";
import Login from "./login";
import { Error, Transaction } from './alerts';
import { Link } from 'react-router-dom'

const token_address = "0xb3210fed6d4659c10f39a0a6342287a0a8895ffc";

function CombineNfts(){
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
  const { data, error, runContractFunction, isFetching, isLoading } =
  useWeb3Contract({
    abi: metadata.output.abi,
    contractAddress: "0xb3210fed6d4659c10f39a0a6342287a0a8895ffc",
    functionName: "combine",
    params: {
      base: watch("cat"),
      item: watch("hood"),
    },
  });

  const onSubmit = () => { 
    runContractFunction()
  }
  return (  
    <form className='font-bold text-center' onSubmit={handleSubmit(onSubmit)}>     
      {errors.exampleRequired && <span>This field is required</span>}
      <label 
        className='p-2 my-2 text-slate-900 bg-lime-400 border-b-2 border-lime-600'
        htmlFor="cat">
          Cat ID:
      </label>
      <input className='p-2  w-[3em] bg-slate-50 text-slate-900'  {...register("cat", { required: true })} />
      <label 
        className='p-2  my-2 text-slate-900 bg-lime-400 border-b-2 border-lime-600'
        htmlFor="hood">
          Hood ID:
      </label>
      <input  className='p-2 w-[3em] bg-slate-50 text-slate-900' {...register("hood", { required: true })} />
      <button className='p-2 m-4 mb-2  text-2xl hover:bg-lime-500 my-4 bg-lime-400 text-slate-900 border-b-4 border-lime-600 outline outline-offset-2 outline-1'
        type='submit'>
          Wear
      </button>
      {isFetching && <p>Fetching...</p>}
      {isLoading && <p>Loading...</p>}
      {error && <Error data={error} />}
      {data &&  
        <div>
          <Transaction data={data.hash} />
          <Link className='font-bold underline hover:text-lime-400' to="/collection">See your new NFT here</Link>
        </div>
      }
      </form>
  );
}

function Combine(){
  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
  const { isWeb3Enabled } = useMoralis();
  const NFTBalances = () => {
     
      if(isLoading) return <p>Loading...</p>;
      if(isFetching) return <p>Fetching...</p>;
        return (
          <div>
            {error && <Error data={error} />}
            <div className='grid grid-cols-3 gap-2'>
              {data && data.result.map((element, index) => {
                if(token_address === element.token_address){
                  if(element.token_id <= 99){
                    return <RenderNft data={{id:element.token_id,amount:element.amount}}/>
                  }
                }
              })}
            </div>
            <div
              className='m-2 bg-orange-400 hover:bg-orange-500 border-b-4 border-orange-600 outline outline-offset-2 outline-1 cursor-pointer' 
              onClick={() => getNFTBalances()}>
              <div className='text-slate-800 mx-2 text-center'>
                Refetch NFTBalances
              </div>
            </div>
          </div>
        );
      };
    if(!isWeb3Enabled) return (<Login />); 
    return (
      <div>
        <h1 className='text-3xl font-bold text-center'>Combine</h1>
        <p className='text-2xl font-bold m-4 text-center'>Choose one cat and a hood to combine into a new NFT.</p>
        <CombineNfts/>
        <NFTBalances/>
      </div>
    )

}

export default Combine
