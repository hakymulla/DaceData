const Lit = require('./utils').Lit;
const Ipfs = require('./utils').Ipfs;
const FileReader = require('./utils').FileReader;
const ethers = require("ethers");
require("dotenv").config({ path: ".env" });
const key1 = process.env.PRIVATE_KEY;
const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

let abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symmetricKey",
                "type": "string"
            }
        ],
        "name": "addSymmetricKey",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "adddaceAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "daceAccess",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "deldaceAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "encryptedSymmetricKey",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_other",
                "type": "address"
            }
        ],
        "name": "isExistdaceAccess",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "showdaceAccess",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

let contractAddress = "0x46de762fe5A3bbC73918B8c3cFe466d18Dd58903"

async function Esave(PrivKey) {

    const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_KEY_URL);
    const signer = new ethers.Wallet(PrivKey, provider)
    const daceContract = new ethers.Contract(contractAddress, abi, provider)
    let contractWithSigner = await daceContract.connect(signer);

    var lit = new Lit()
    await lit.connect()

    var ipfs = new Ipfs()
    await ipfs.ipfs_client()

    const data = FileReader('./Data/sample2.json')
    // const data = FileReader('./Data/nature.jpg')


    console.log(data)

    var result = await lit.encryptString(data, PrivKey);
    console.log("encryptedFile:", result.encryptedFile)
    console.log("encryptedSymmetricKey:", result.encryptedSymmetricKey)

    let cid = await ipfs.store(result.encryptedFile);
    console.log('encrypted data cid:', cid)
    tx = await contractWithSigner.addSymmetricKey(cid.toString(), result.encryptedSymmetricKey)
    console.log("transaction sent")
    await tx.wait();
    console.log("IPFS CID Stored in ", contractAddress)

}

Esave(key1)
// https://mumbai.polygonscan.com/address/0x3C99a5Eb609eb08A8c1c327A80f6a23a6C647874#code