import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductWithoutReviewById, updateProduct } from "../../services/productService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductWithoutReviewById(id);
        setProduct({
          ...data,
          colors: Array.isArray(data.colors) ? data.colors : [],
          sizes: Array.isArray(data.sizes) ? data.sizes : [],
          galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading || !product) return <p>Loading product...</p>;

  // Handle simple input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle array fields
  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...product[field]];
    updatedArray[index] = value;
    setProduct({ ...product, [field]: updatedArray });
  };

  const handleAddArrayField = (field) => {
    setProduct({ ...product, [field]: [...product[field], ""] });
  };

  const handleRemoveArrayField = (field, index) => {
    const updatedArray = product[field].filter((_, i) => i !== index);
    setProduct({ ...product, [field]: updatedArray });
  };

  // Main image
  const handleMainImageUpload = (e) => {
    if (e.target.files.length > 0) {
      setMainImageFile(e.target.files[0]);
    }
  };

  const handleRemoveMainImage = () => {
    setMainImageFile(null);
    setProduct({ ...product, mainImage: "" });
  };

  // Gallery images
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewGalleryFiles((prev) => [...prev, ...files]); // append multiple files
  };

  const handleRemoveGalleryImage = (index, type) => {
    if (type === "existing") {
      setProduct({
        ...product,
        galleryImages: product.galleryImages.filter((_, i) => i !== index),
      });
    } else {
      setNewGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Keep only S3 URLs for existing gallery images
      const productPayload = {
        ...product,
        galleryImages: product.galleryImages.filter((url) => url.startsWith("https://")),
      };

      formData.append(
        "product",
        new Blob([JSON.stringify(productPayload)], { type: "application/json" })
      );

      if (mainImageFile) formData.append("mainImage", mainImageFile);
      newGalleryFiles.forEach((file) => formData.append("galleryImages", file));

      const response = await updateProduct(id, formData);
      console.log("✅ Product updated:", response);
      alert("✅ Product updated successfully!");
      navigate("/admin/products/view");
    } catch (error) {
      console.error("Failed to update product:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert(`❌ Update failed: ${error.response.data}`);
      } else {
        alert(`❌ Update failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-3">
        <button className="btn btn-secondary" onClick={() => navigate("/admin/products/view")}>
          ← Back
        </button>
        <h3 style={{ marginLeft: "35%" }}>Update Product</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Basic fields */}
          {[
            { label: "Name", name: "name" },
            { label: "Category", name: "category" },
            { label: "Subcategory", name: "subcategory" },
            { label: "SKU", name: "sku" },
            { label: "Short Description", name: "shortDescription", textarea: true },
            { label: "Description", name: "description", textarea: true },
            { label: "Fabric", name: "fabric" },
            { label: "Price", name: "price", number: true },
            { label: "Discount (%)", name: "discount", number: true },
            { label: "Stock", name: "stock", number: true },
          ].map(({ label, name, textarea, number }) => (
            <div className="col-md-6 mb-3" key={name}>
              <label>{label}</label>
              {textarea ? (
                <textarea
                  name={name}
                  className="form-control"
                  value={product[name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={number ? "number" : "text"}
                  name={name}
                  className="form-control"
                  value={product[name] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          {/* Main Image */}
          <div className="col-md-6 mb-3">
            <label>Main Image</label>
            <input type="file" className="form-control" onChange={handleMainImageUpload} />
            {product.mainImage && (
              <div className="mt-2 d-flex align-items-center">
                <img
                  src={product.mainImage}
                  alt="Main"
                  style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
                />
                <button type="button" className="btn btn-danger" onClick={handleRemoveMainImage}>
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div className="col-md-6 mb-3">
            <label>Gallery Images</label>
            <input type="file" className="form-control mb-2" multiple onChange={handleGalleryUpload} />

            {/* Existing images */}
            {product.galleryImages.map((img, index) => (
              <div className="d-flex align-items-center mb-2" key={`existing-${index}`}>
                <img
                  src={img}
                  alt="Gallery"
                  style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "5px" }}
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveGalleryImage(index, "existing")}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* New files */}
            {newGalleryFiles.map((file, index) => (
              <div className="d-flex align-items-center mb-2" key={`new-${index}`}>
                <img
                  src={URL.createObjectURL(file)}
                  alt="New"
                  style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "5px" }}
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveGalleryImage(index, "new")}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Colors */}
          <div className="col-md-6 mb-3">
            <label>Colors</label>
            {product.colors.map((color, index) => (
              <div className="d-flex mb-2" key={index}>
                <input
                  type="text"
                  className="form-control me-2"
                  value={color}
                  onChange={(e) => handleArrayChange("colors", index, e.target.value)}
                />
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveArrayField("colors", index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-success" onClick={() => handleAddArrayField("colors")}>
              Add Color
            </button>
          </div>

          {/* Sizes */}
          <div className="col-md-6 mb-3">
            <label>Sizes</label>
            {product.sizes.map((size, index) => (
              <div className="d-flex mb-2" key={index}>
                <input
                  type="text"
                  className="form-control me-2"
                  value={size}
                  onChange={(e) => handleArrayChange("sizes", index, e.target.value)}
                />
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveArrayField("sizes", index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-success" onClick={() => handleAddArrayField("sizes")}>
              Add Size
            </button>
          </div>

          {/* Tags, Occasion, Gender */}
          <div className="col-md-6 mb-3">
            <label>Tags</label>
            <input type="text" name="tags" className="form-control" value={product.tags || ""} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Occasion</label>
            <input type="text" name="occasion" className="form-control" value={product.occasion || ""} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Gender</label>
            <select name="gender" className="form-select" value={product.gender || ""} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Men">Male</option>
              <option value="Women">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
