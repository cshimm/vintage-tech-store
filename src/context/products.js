import React from 'react';
import { featuredProducts, paginate } from '../utils/helpers';
export const ProductContext = React.createContext();
// import FeaturedProducts from '../components/Products/FeaturedProducts';
// { Children }
// import axios from 'axios';

//contentful
const contentful = require('contentful');
const client = contentful.createClient({
  space: 'nen878tszp0g',
  accessToken: 'lS5S6LnFpseqw_6nHTqxaiW9_sFHcFjAQSiwKXHeVyM',
});

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  // extra state values
  const [sorted, setSorted] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filters, setFilters] = React.useState({
    search: '',
    category: 'all',
    shipping: false,
    price: 'all',
  });

  // used when content existed on strapi

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

  //content from contentful
  React.useEffect(() => {
    setLoading(true);
    client.getEntries().then((response) => {
      const { items } = response;
      const productsArray = items.map((item) => {
        const { description, title, price, image, featured, id } = item.fields;
        const value =
          (description && description.content[0].content[0].value) || null;
        const url = (image && image.fields.file.url) || null;

        return { title, value, price, url, key: id || null, id, featured };
      });

      const featuredProduct = featuredProducts(productsArray);

      setSorted(paginate(productsArray));
      setProducts(productsArray);
      setFeatured(featuredProduct);
      setLoading(false);
    });
    return () => {};
  }, []);

  const changePage = (index) => {
    setPage(index);
  };
  const updateFilters = (e) => {
    console.log(e);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
