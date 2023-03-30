const fetchProduct = async () => {
  const res = await fetch(`http://localhost:3001/api/product`);

  if (!res.ok) {
    throw new Error(`pet search not okay ${animal}, ${location}, ${breed}`);
  }
  return res.json();
};

export default fetchProduct;
