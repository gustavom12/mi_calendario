import * as CryptoJS from 'crypto-js';

const secretPassword:any = process.env.REACT_APP_ENCRYPT

function encrypt(value : string) : string{
  return CryptoJS.AES.encrypt(value, secretPassword).toString();
}
function decrypt(textToDecrypt:string){
  return CryptoJS.AES.decrypt(textToDecrypt, secretPassword).toString(CryptoJS.enc.Utf8);
}


export {encrypt, decrypt} ;
