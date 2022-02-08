async function getNFTMetadata(token){
    const url = `https://api.covalenthq.com/v1/80001/tokens/0xb3210fed6d4659c10f39a0a6342287a0a8895ffc/nft_metadata/${token}/?key=ckey_20edb71289af445abdb131485a7`
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export default getNFTMetadata;  