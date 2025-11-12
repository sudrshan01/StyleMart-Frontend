import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCard";
import { fetchProducts } from "../../store/productsStore";
import { fetchReviews } from "../../store/reviewStore";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get products and reviews from Redux store
  const { items: products, loading: productLoading, error } = useSelector(
    (state) => state.products
  );
  const { items: allReviews, loading: reviewLoading } = useSelector(
    (state) => state.reviews
  );

  // Fetch products & reviews on mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchReviews());
  }, [dispatch]);

  // Debug logs
  useEffect(() => {
    if (products.length > 0) console.log("✅ Products:", products);
  }, [products]);

  useEffect(() => {
    if (allReviews.length > 0) console.log("✅ Reviews:", allReviews);
  }, [allReviews]);

  // Handle loading and errors
  if (productLoading || reviewLoading)
    return <p className="text-center">Loading products & reviews...</p>;

  if (error)
    return <p className="text-danger text-center">Error: {error}</p>;

  // Combine each product with its related reviews and average rating
  const productsWithReviews = products.map((product) => {
    // Check product ID (from backend it might be product.id or product.product.id)
    const productId = product.id || product.product?.id;

    // Filter reviews related to this product
    const productReviews = allReviews.filter(
      (r) => r.productId === productId || r.product?.id === productId
    );

    // Calculate average rating
    const averageRating =
      productReviews.length > 0
        ? (
            productReviews.reduce(
              (sum, r) => sum + (r.rating || 0),
              0
            ) / productReviews.length
          ).toFixed(1)
        : 0;

    return {
      product: product.product ? product.product : product,
      reviews: productReviews,
      averageRating: parseFloat(averageRating),
    };
  });

  // Group products by gender
  const groupedProducts = {
    Men: productsWithReviews.filter((p) => p.product.gender === "Men"),
    Women: productsWithReviews.filter((p) => p.product.gender === "Women"),
    Unisex: productsWithReviews.filter((p) => p.product.gender === "Unisex"),
    Kids: productsWithReviews.filter((p) => p.product.gender === "Kids"),
  };

  // Navigate to gender-specific pages
  const handleViewAll = (section) => {
    navigate(`/${section.toLowerCase()}`);
  };

  return (
    <div className="container py-4">
      {Object.entries(groupedProducts).map(([section, sectionProducts]) =>
        sectionProducts.length > 0 ? (
          <div key={section} className="mb-5">
            {/* Section Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="text-black fw-bold border-bottom pb-2 m-0">
                {section}
                {section === "Unisex" || section === "Kids" ? "" : "'s"}
              </h3>

              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() => handleViewAll(section)}
              >
                View All
              </button>
            </div>

            {/* Product Grid */}
            <div className="row">
              {sectionProducts.slice(0, 8).map(
                ({ product, reviews, averageRating }) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    key={product.id}
                  >
                    <ProductCard
                      product={product}
                      reviews={reviews}
                      averageRating={averageRating}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ProductList;
