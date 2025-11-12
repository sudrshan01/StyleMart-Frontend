import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./productCard";

const SimilarProducts = ({ currentProduct }) => {
  const { items: allProducts } = useSelector((state) => state.products);

  if (!currentProduct) return null;

  // Filter products with the same occasion, exclude current product
  const similarProducts = allProducts
    .filter(
      (p) =>
        p.product?.occasion === currentProduct.occasion &&
        p.product?.id !== currentProduct.id
    )
    // Shuffle and take 4
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (similarProducts.length === 0) return null;

  return (
    <div className="similar-products mt-3">
     
      <div className="row">
        {similarProducts.map(({ product, reviews, averageRating }) => (
          <div className="col-6 col-md-3 mb-3" key={product.id}>
            <ProductCard
              product={product}
              reviews={reviews}
              averageRating={averageRating}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
