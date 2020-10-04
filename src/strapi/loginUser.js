//login user
import axios from 'axios';
import { strapiURL } from '../utils/URL';

export default async function loginUser({ email, password }) {
  const response = await axios
    .post(`${strapiURL}/auth/local`, {
      identifier: email,
      password,
    })
    .catch((error) => console.log(error));
  return response;
}
