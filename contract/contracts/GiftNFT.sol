// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";


contract GiftNFT is ERC721, ERC721URIStorage, FunctionsClient, ConfirmedOwner {

    // Chainlink function variables
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public donId;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    // Gift variables
    uint256 public _tokenId;
    string private _baseTokenURI;

    constructor(
        address router, 
        bytes32 _donId,
        string memory baseURI
    )
        ERC721("Pinnie", "PIN")
        FunctionsClient(router)
        ConfirmedOwner(msg.sender)
    {
        _baseTokenURI = baseURI;
        donId = _donId;
    }

    function mint(address to, string memory uri) public onlyOwner {
        uint256 newTokenId = _tokenId++;
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, uri);
    }

  //Returns the id of the next token without having to mint one.
    function nextId() external view returns(uint256) {
        return _tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    // The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }




    function setDonId(bytes32 newDonId) external onlyOwner {
        donId = newDonId;
    }

    /**
    * @notice Triggers an on-demand Functions request using remote encrypted secrets
    * @param source JavaScript source code
    * @param secretsLocation Location of secrets (only Location.Remote & Location.DONHosted are supported)
    * @param encryptedSecretsReference Reference pointing to encrypted secrets
    * @param args String arguments passed into the source code and accessible via the global variable `args`
    * @param bytesArgs Bytes arguments passed into the source code and accessible via the global variable `bytesArgs` as hex strings
    * @param subscriptionId Subscription ID used to pay for request (FunctionsConsumer contract address must first be added to the subscription)
    * @param callbackGasLimit Maximum amount of gas used to call the inherited `handleOracleFulfillment` method
    */
    function sendRequest(
        string calldata source,
        FunctionsRequest.Location secretsLocation,
        bytes calldata encryptedSecretsReference,
        string[] calldata args,
        bytes[] calldata bytesArgs,
        uint64 subscriptionId,
        uint32 callbackGasLimit
    ) external onlyOwner {
        FunctionsRequest.Request memory req; // Struct API reference: https://docs.chain.link/chainlink-functions/api-reference/functions-request
        req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, source);
        req.secretsLocation = secretsLocation;
        req.encryptedSecretsReference = encryptedSecretsReference;
        if (args.length > 0) {
        req.setArgs(args);
        }
        if (bytesArgs.length > 0) {
        req.setBytesArgs(bytesArgs);
        }
        s_lastRequestId = _sendRequest(req.encodeCBOR(), subscriptionId, callbackGasLimit, donId);
    }

    /**
    * @notice Store latest result/error
    * @param requestId The request ID, returned by sendRequest()
    * @param response Aggregated response from the user code
    * @param err Aggregated error from the user code or from the execution pipeline
    * Either response or error parameter will be set, but never both
    */
    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        s_lastResponse = response;
        s_lastError = err;
    }
}