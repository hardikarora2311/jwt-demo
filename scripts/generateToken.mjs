import { decode_jwt, encode_jwt } from "jwt-library";

const secret = "my-secret-key";
const audience = "your-audience";
const issuer = "your-issuer";


const token = encode_jwt(secret, "user-id", { role: "admin" }, 3600, audience, issuer);
console.log('Valid Token:', token);


const decodeToken= await decode_jwt(secret, token, audience, issuer);
console.log(decodeToken);


