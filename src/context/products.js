import React from 'react';
// { Children }
// import axios from 'axios';
// import url from '../utils/URL';
// import { featuredProducts, flattenProducts } from '../utils/helpers';
export const ProductContext = React.createContext();

//provider, consumer, useContext

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'nen878tszp0g',
  accessToken: 'lS5S6LnFpseqw_6nHTqxaiW9_sFHcFjAQSiwKXHeVyM',
});

// client
//   .getEntries()
//   .then((response) => console.log(response.items))
//   .catch(console.error);

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  // const [featured, setFeatured] = React.useState([]);

  // React.useEffect(() => {
  //   setLoading(true);
  //   axios.get(`${url}/products`).then((response) => {
  //     const featuredProduct = featuredProducts(flattenProducts(response.data));
  //     const products = flattenProducts(response.data);
  //     setFeatured(featuredProduct);
  //     setProducts(products);
  //     setLoading(false);
  //   });
  //   return () => {};
  // }, []);
  React.useEffect(() => {
    setLoading(true);
    client.getEntries().then((response) => {
      const { items } = response;
      const productsArray = items.map((item, index) => {
        const { description, title, price, image } = item.fields;

        const { value } = description.content[0].content[0];
        const { url } = image.fields.file;
        return { title, value, price, url, key: index, id: index };
      });
      // const featuredProduct = featuredProducts(flattenProducts(response.data));
      // const products = flattenProducts(response.data);
      // setFeatured(featuredProduct);
      setProducts(productsArray);
      setLoading(false);
    });
    return () => {};
  }, []);

  return (
    //send featured in value prop
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
}
