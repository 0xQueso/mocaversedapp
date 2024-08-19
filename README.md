# Mocaverse Gate
Frontend for mocaverse gating Dapp

## Getting Started

run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Be sure to have your testing wallet in your browser and connect.

## Design consideration

Went with using Wagmi and React for more smooth experience developing a web3 dApp, followed with Typescript making the code more predictable and easier to debug. And wagmi lib abstracts away much of the complexity involved in web3 interactions. Used Chakra UI that is a modular component library that provides a set of accessible, reusable, and customizable UI components. easy to read and follow through.
Also only used Fetch API that is a native JavaScript API for making HTTP requests, providing a simple and straightforward way to interact with web services.
 

## What would I improve if I have the time
I would have integrated all interactions through the deployed smart contract, enhancing the project's functionality. Additionally, I would improve error handling and toast notifications, apply proper design practices for components, and implement more effective state management, also show the private space/data of the user once accepted in the reservation.