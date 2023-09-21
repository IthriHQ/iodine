export const abi = [
    {
      "type": "constructor",
      "name": "",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {
          "type": "address",
          "name": "owner",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "approved",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ApprovalForAll",
      "inputs": [
        {
          "type": "address",
          "name": "owner",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "operator",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "bool",
          "name": "approved",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "AssetTheftReported",
      "inputs": [
        {
          "type": "uint256",
          "name": "tokenId",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "thief",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTheftReported",
      "inputs": [
        {
          "type": "uint256",
          "name": "tokenId",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "thief",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "type": "address",
          "name": "previousOwner",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "newOwner",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TokenTheftReported",
      "inputs": [
        {
          "type": "uint256",
          "name": "tokenId",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "thief",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "to",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "function",
      "name": "addMilestone",
      "inputs": [
        {
          "type": "uint256",
          "name": "_tokenId",
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "_milestone",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        {
          "type": "address",
          "name": "to",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {
          "type": "address",
          "name": "owner",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "caseCounter",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "createTheftCase",
      "inputs": [
        {
          "type": "address",
          "name": "_thief",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "_victim",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "_stolenAmount",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "createTribunalNFT",
      "inputs": [
        {
          "type": "string",
          "name": "_caseDescription",
          "internalType": "string"
        },
        {
          "type": "address",
          "name": "_plaintiff",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "_defendant",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "_stolenFundsAmount",
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "_legalProceedings",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getApproved",
      "inputs": [
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isApprovedForAll",
      "inputs": [
        {
          "type": "address",
          "name": "owner",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "operator",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "markTribunalResolved",
      "inputs": [
        {
          "type": "uint256",
          "name": "_tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ownerOf",
      "inputs": [
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "reportAssetTheft",
      "inputs": [
        {
          "type": "uint256",
          "name": "_tokenId",
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "_thief",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "reportOwnershipTheft",
      "inputs": [
        {
          "type": "uint256",
          "name": "_tokenId",
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "_thief",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "reportTokenTheft",
      "inputs": [
        {
          "type": "uint256",
          "name": "_tokenId",
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "_thief",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "resolveTheftCase",
      "inputs": [
        {
          "type": "uint256",
          "name": "_tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "to",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "to",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        },
        {
          "type": "bytes",
          "name": "data",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setApprovalForAll",
      "inputs": [
        {
          "type": "address",
          "name": "operator",
          "internalType": "address"
        },
        {
          "type": "bool",
          "name": "approved",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "type": "bytes4",
          "name": "interfaceId",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "theftCases",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "thief",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "victim",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "stolenAmount",
          "internalType": "uint256"
        },
        {
          "type": "bool",
          "name": "resolved",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokenIdCounter",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokenURI",
      "inputs": [
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "to",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        {
          "type": "address",
          "name": "newOwner",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "tribunalDetails",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "string",
          "name": "caseDescription",
          "internalType": "string"
        },
        {
          "type": "address",
          "name": "plaintiff",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "defendant",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "stolenFundsAmount",
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "legalProceedings",
          "internalType": "string"
        },
        {
          "type": "bool",
          "name": "isResolved",
          "internalType": "bool"
        },
        {
          "type": "bool",
          "name": "fundsLocked",
          "internalType": "bool"
        },
        {
          "type": "address",
          "name": "fundsBeneficiary",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "unlockFunds",
      "inputs": [
        {
          "type": "uint256",
          "name": "_tokenId",
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "_beneficiary",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ] as const