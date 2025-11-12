import React, { useEffect, useState } from "react";
import { getProductsPaginated, deleteProduct } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterGender, setFilterGender] = useState("");
  const [stockLessThan10, setStockLessThan10] = useState(false);

  const navigate = useNavigate();

  const fetchProducts = async (pageNumber = 0, pageSize = size) => {
    try {
      setLoading(true);
      const data = await getProductsPaginated(pageNumber, pageSize);
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, size);
  }, [page, size]);

  // Filter products whenever products or filter criteria change
  useEffect(() => {
    let filtered = [...products];

    if (filterGender) {
      filtered = filtered.filter((p) => p.gender === filterGender);
    }
    if (stockLessThan10) {
      filtered = filtered.filter((p) => p.stock < 10);
    }

    setFilteredProducts(filtered);
  }, [products, filterGender, stockLessThan10]);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully");
        fetchProducts(page, size);
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/products/update/${id}`);
  };

  return (
    <div className="container mt-2">
      <h3>Products</h3>

      {/* Filters */}
      <div className="mb-3 d-flex align-items-center gap-3">
        <label>Gender:</label>
        <select
          className="form-select w-auto"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
        >
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="stockCheck"
            checked={stockLessThan10}
            onChange={(e) => setStockLessThan10(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="stockCheck">
            Stock &lt; 10
          </label>
        </div>
      </div>

      {/* Page Size Selector */}
      <div className="mb-3 d-flex align-items-center">
        <label className="me-2">Items per page:</label>
        <select
          className="form-select w-auto"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
        >
          {[5, 10, 15, 20].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>SKU</th>
                <th>Short Desc</th>
                <th>Description</th>
                <th>Fabric</th>
                <th>Colors</th>
                <th>Sizes</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Main Image</th>
                <th>Gallery</th>
                <th>Tags</th>
                <th>Occasion</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="19" className="text-center">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod, index) => (
                  <tr key={prod.id || index}>
                    <td>{index + 1 + page * size}</td>
                    <td>{prod.name}</td>
                    <td>{prod.category}</td>
                    <td>{prod.subcategory}</td>
                    <td>{prod.sku}</td>
                    <td>{prod.shortDescription}</td>
                    <td>{prod.description}</td>
                    <td>{prod.fabric}</td>
                    <td>{prod.colors?.join(", ")}</td>
                    <td>{prod.sizes?.join(", ")}</td>
                    <td>{prod.price}</td>
                    <td>{prod.discount}</td>
                    <td>{prod.stock}</td>
                    <td>
                      {prod.mainImage && (
                        <img
                          src={prod.mainImage}
                          alt={prod.name}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      )}
                    </td>
                    <td>
                      {prod.galleryImages?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${prod.name}-${idx}`}
                          style={{ width: "30px", height: "30px", objectFit: "cover", marginRight: "3px" }}
                        />
                      ))}
                    </td>
                    <td>{prod.tags}</td>
                    <td>{prod.occasion}</td>
                    <td>{prod.gender}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleUpdate(prod.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(prod.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-primary"
              onClick={handlePrev}
              disabled={page === 0}
            >
              ← Prev
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button
              className="btn btn-outline-primary"
              onClick={handleNext}
              disabled={page >= totalPages - 1}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsTable;
