// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/VRFConsumerBase.sol";

contract  randomNft is VRFConsumerBase, ERC1155 {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    mapping(bytes32 => address) public requestToSender;
    
    constructor() 
        public ERC1155("https://gateway.pinata.cloud/ipfs/QmS6RAvxkfWLUs54cnVYBNfdoiBjh2JqWSqsdF5QbX8yJ9/{id}.json") 
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, 
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  
        )
    {
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001  * 10 ** 18; 
    }
    
    function MintRandom() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        bytes32 requestId = requestRandomness(keyHash, fee);
        requestToSender[requestId] = msg.sender;
        return requestId;
        
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
        _mint(requestToSender[requestId], randomResult % 100, 1, "");
    }

    
    function mintTest(uint id) public {
        _mint(msg.sender, id, 1, "");
    } 

    function combine(uint256 base,uint256 item) public{
        require(base <= 49 && base >= 0, "Not a valid monster ID");
        require(item <= 99 && item >= 50, "Not a valid item ID");
        _burn(msg.sender, base, 1);
        _burn(msg.sender, item, 1);
        _mint(msg.sender, item * 100 + base, 1, "");
    }

    function withdrawLink() external {}
}