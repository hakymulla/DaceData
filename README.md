# 🚀 DACEData

DACEdata also know as Decentralised Access Control Encrypted data is a platform that allows users to

    1. Store data in a decentralised database such as Filecoin's IPFS.
    3. Encrypt and lock data using an on chain condition.
    3. Decrypt locked data based on the given on chain condition.


## The tech stack of your dApp
- IPFS
- Lit Protocol
- Sign in With Ethereum (SIWE)


## Description 

Users are able to store data in a decentralised fashion, this data is encrpypted and can only be accessed by authorised party. This data includes content like json, images etc. Giving access is as easy as adding an address by interacting with the smart contract.


## Structure

1. Backend
    - utils.js contains utilities functions

    - EncryptSave.js allows users Encrypt and Save data in IPFS by
        - Sign a transaction.
        - Zip and Encrypt the data.
        - Create an Encrpytion key based on an EVM based condition (Access Control Condition based on Smart Contract) (More Explanation in Contract).
        - Encrypted Symmetric Key saved on the Smart Contract.
        - Get an IPFS CID to help share data with people.

    - DecrpytView allows users to Decrypt and View/Save data from IPFS by
        -  Sign a transaction.
        - Get data from IPFS CID.
        - Decrypt the data of an IPFS CID using the EVM based condition.
    
2. Contract
    - Dace.sol
        - Allows users to Add and Delete Ethereum Addresses that can have access to data (Access Control Condition based on Smart Contract)
        - Stores the Encrypted Symmetric Key of each CID.

3. Data
    - Dummy datas for testing.

## Demo
https://youtu.be/gyZMG-PGp3c
