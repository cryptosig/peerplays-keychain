![](http://u.cubeupload.com/cryptosig/logo.png)

Putting private keys directly into websites is not safe or secure, even ones run by reputable community members. Yet this is currently how nearly every Peerplays-based site or service currently works. On top of that, most Peerplays users likely use their master password which is even worse.

The Peerplays-GUI desktop wallet software is a secure alternative, but it is too difficult to use for the majority of Peerplays users and does not easily interact with websites - which is Peerplays's primary use case.

On Ethereum, you never have to enter your private key into a website to use a dApp. You can just use a browser extension like Metamask, which dApp websites can interface with to securely store your keys and broadcast transactions to the blockchain.

Peerplays Keychain aims to bring the security and ease-of-use of Metamask to the Peerplays blockchain platform.

### Installation

You can download and install the latest published version of the extension for the following browsers:

- Google Chrome (or Opera/Brave): [on Chrome Store](https://chrome.google.com/webstore/detail/peerplays-keychain/)
  - Export your keys from your wallet (in settings)
  - Download this repository as zip
  - Unzip the downloaded folder
  - Right click on any existing extension > Manage my extensions.
  - Activate developer mode.
  - Click "Load Unpacked" and select the unzipped folder.
  - Import your keys (use the same master password)
- Firefox: [on Firefox Addon Store](https://addons.mozilla.org/en-GB/firefox/addon/peerplays-keychain/)

### Features

The Peerplays Keychain extension includes the following features:

- Store an unlimited number of Peerplays account keys, encrypted with AES
- View balances, transaction history, and GPOS voting power
- Send PPY and other token transfers, manage witness votes, and update GPOS powerups right from the extension
- Manage your Peerplays Engine/DEX tokens
- Power up or down
- Securely interact with Peerplays-based websites that have integrated with Peerplays Keychain
- Manage transaction confirmation preferences by account and by website
- Locks automatically on browser shutdown or manually using the lock button

### Website Integration

Websites can currently request the Peerplays Keychain extension to perform the following functions / broadcast operations:

- Send a handshake to make sure the extension is installed
- Decrypt a message encrypted by a Peerplays account private key (commonly used for "logging in")
- Broadcast a vote
- Broadcast Couch Potato operations
- Send a transfer
- Send Peerplays DEX tokens
- Send Delegations
- Power up/down
- Vote for witnesses
- Create/Remove/Vote for proposals
- Create claimed accounts
- Sign Tx
