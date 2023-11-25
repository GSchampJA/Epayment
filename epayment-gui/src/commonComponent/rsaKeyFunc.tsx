import * as forge from 'node-forge';

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

const GenRSAKeypair = (): KeyPair => {
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
  const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

  return {
    publicKey: publicKeyPem,
    privateKey: privateKeyPem,
  };
};

const RsaEncrypt = (plainText: string, publicKeyStr: string): string => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyStr);
  const encrypted = publicKey.encrypt(plainText);
  return forge.util.encode64(encrypted);
};

const RsaDecrypt = (decryptData: string, privateKeyStr: string): string => {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyStr);
    const decrypted = privateKey.decrypt(forge.util.decode64(decryptData));
    return decrypted;
  } catch (error) {
    console.log('decrypt error');
    console.log(error);
    return '';
  }
};

const SaveKeyAndDownload = (keyStr: string, fileName: string): void => {
  const keyBlob = new Blob([keyStr], { type: 'text/plain' });

  const keyUrl = URL.createObjectURL(keyBlob);

  const keyLink = document.createElement('a');

  keyLink.href = keyUrl;

  const download_filename = fileName + '.txt';

  keyLink.download = download_filename;

  document.body.appendChild(keyLink);

  keyLink.click();

  document.body.removeChild(keyLink);

  URL.revokeObjectURL(keyUrl);
};

const caesarCipherEncrypt = (message: string, key: string): string => {
  const shift = parseInt(key) % 26;
  return message
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      } else {
        return char;
      }
    })
    .join('');
};

const caesarCipherDecrypt = (message: string, key: string): string => {
  const shift = parseInt(key) % 26;
  return message
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      } else {
        return char;
      }
    })
    .join('');
};
