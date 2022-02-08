import React, { useEffect, useState } from 'react';
import getNFTMetadata from '../api/getnftMetadata';

export function RenderNft(props) {
  const [nft, setNft] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getNFTMetadata(props.data.id);
    setNft(
      {
        token_id: props.data.id,
        amount: props.data.amount,
        image: `https://gateway.pinata.cloud/ipfs/QmcQtdR4WaJK383TTnPnRcBCDATskaAoPWSpZpgNoFXDvS/${props.data.id}.png`,
      }
    );
  }, [nft]);
  return (
    <div>
      {nft &&
        <div>
          <div className='flex flex-row font-bold'>
            <h2 className='text-lime-500'>ID: </h2>
            <h2>{nft.token_id} </h2>
            <h4 className='text-lime-500'>Amount: </h4>
            <h4>
              {nft.amount} 
            </h4>
          </div>
          <img src={nft.image} alt={nft.description} />
        </div>
}
    </div>
  );
}
