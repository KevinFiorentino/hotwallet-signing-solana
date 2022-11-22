import { toString as uint8arrayToString } from 'uint8arrays';
import { PublicKey } from '@solana/web3.js';

import * as nacl from 'tweetnacl';
const signer = nacl.sign || nacl.default.sign;

// Preparing wallet
const publicKey = new PublicKey('HeDnSsv9rykjKyGUv4GGXR7FgaRbViSftAh7JgcsAL3z');
const secretKey = new Uint8Array([
  153, 109,  57, 143, 124,   3,   9, 248,  50, 103,  66,
   56, 187,  81,  35, 248, 202, 112, 176, 142, 200,  67,
  215, 111, 177, 115,  89,  55, 170,  96, 191, 235, 247,
   67, 239, 103,  56,  19, 182, 242, 253,  36,  68,  91,
   85,  19, 114, 155,  37,  80,  77, 203, 204, 147,  55,
  154, 246, 223, 173,  74, 146, 114, 224,   1
]);

// Signing message
const messageToSign = 'A random message to sign!';
const signature = signer.detached(Buffer.from(messageToSign), secretKey);

console.log('signature', signature);

// Signature compatible with https://litprotocol.com/
const hexSignature = uint8arrayToString(signature, 'base16');

const authSig = {
  sig: hexSignature,
  derivedVia: 'solana.signMessage',
  signedMessage: messageToSign,
  address: publicKey.toBase58(),
};

console.log('authSig', authSig);
