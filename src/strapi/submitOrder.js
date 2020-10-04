// submit order
import axios from 'axios';
import { strapiURL } from '../utils/URL';

async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
  const response = await axios
    .post(
      `${strapiURL}/orders`,
      {
        name,
        total,
        items,
        stripeTokenId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .catch((error) => console.log(error));
  return response;
}

export default submitOrder;
