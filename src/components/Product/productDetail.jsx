import React, { useEffect, useState  } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductDetailCard from "./productDetailCard";
import { fetchProducts } from "../../store/productsStore";
import Cart from "../Cart/cart";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
 const [cart, setCart] = useState([]); 
  const { items: products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const product = products.find(p => String(p.product.id) === String(id));

  const handleAddToCart = (cartItem) => {
    setCart((prev) => [...prev, cartItem]);
  
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p className="text-red-600">Product not found</p>;

  return (
    
        <div className="container py-4">
      <div className="row g-4">
        <div className="col-12">
          <ProductDetailCard item={product} onAddToCart={handleAddToCart} />
        </div>
      </div>
      <Cart cart={cart} />
    </div>

  );
}

export default ProductDetail;
