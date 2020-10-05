// import url from './URL';
//flatten
export function flattenProducts(data) {
  return data.map((item) => {
    // cloudindary
    // let image = item.image[0].url;

    let image = (item.image && item.image.url) || null;
    return { ...item, image };
  });
}

// helper functions

export function featuredProducts(data) {
  return data.filter((item) => {
    return item.featured === true;
  });
}

//pagination
export function paginate(products) {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  //splice method
  // const newProducts = Array.from({ length: numberOfPages }, () => {
  //   return products.splice(0, itemsPerPage);
  // });

  //slice method
  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });

  //code goes here
  return newProducts;
}
