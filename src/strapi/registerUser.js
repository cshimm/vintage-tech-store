import axios from 'axios';
import { strapiURL } from '../utils/URL';

export default async function registerUser({ email, password, username }) {
  const response = await axios
    .post(`${strapiURL}/auth/local/register`, {
      username,
      email,
      password,
    })
    .catch((error) => console.log(error));
  return response;
}
