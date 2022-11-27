const ethers = require("ethers");
const fs = require('fs');
const Lit = require('./utils').Lit;
const Ipfs = require('./utils').Ipfs;
const key2 = process.env.PRIVATE_KEY_2;

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

const abi = [
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
const contractAddress = "0x46de762fe5A3bbC73918B8c3cFe466d18Dd58903"

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_KEY_URL);
// const signer = new ethers.Wallet(PrivKey, provider)
const daceContract = new ethers.Contract(contractAddress, abi, provider)

async function DView(cid) {

    let encryptedSymmetricKey = await daceContract.encryptedSymmetricKey(cid)
    var lit = new Lit()
    await lit.connect()

    var ipfs = new Ipfs()
    await ipfs.ipfs_client()


    let saved_encrypted = await ipfs.getData(cid);
    console.log("saved_encrypted:", saved_encrypted)

    var decrypted_file = await lit.decryptImage(saved_encrypted, encryptedSymmetricKey, key2)

    if ((Object.keys(decrypted_file.decrypted_json)[0] == 'type') & (Object.keys(decrypted_file.decrypted_json)[1] == 'data')) {
        console.log('Image Type')
        let array = new Uint8Array(decrypted_file.decrypted_json.data);
        fs.writeFileSync("data.jpeg", Buffer.from(array))
    }
    else {
        console.log('JSON File')
        console.log("Decrypted File:", decrypted_file.decrypted_json)
    }

}

cid = "QmcJVUTd1b9rHAJzRMUbNi59VmuFmYgHxitac2WV2ABACv"
DView(cid)
// QmNcWT48NFoWvKJ5Btz4bGCuwuaPCSC6YFkyxFy1FZq29Q

// QmdouLHGbQQiHfamT3dKg6FezwkM13pEWqo9htgFf8QXmF