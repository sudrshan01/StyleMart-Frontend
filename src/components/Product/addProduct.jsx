import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import "bootstrap/dist/css/bootstrap.min.css";

const AddProductForm = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const [product, setProduct] = useState({
    name: "",
    category: "",
    subcategory: "",
    sku: "",
    shortDescription: "",
    description: "",
    fabric: "",
    colors: [],
    sizes: [],
    price: "",
    discount: "",
    stock: "",
    tags: "",
    occasion: "",
    gender: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const addColor = () => {
    if (colorInput && !product.colors.includes(colorInput)) {
      setProduct({ ...product, colors: [...product.colors, colorInput] });
      setColorInput("");
    }
  };

  const addSize = () => {
    if (sizeInput && !product.sizes.includes(sizeInput)) {
      setProduct({ ...product, sizes: [...product.sizes, sizeInput] });
      setSizeInput("");
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    if (mainImage) formData.append("mainImage", mainImage);
    galleryImages.forEach((file) => formData.append("galleryImages", file));

    try {
      const res = await axios.post("http://localhost:8081/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Product created:", res.data);
      alert("Product uploaded successfully!");
      navigate("/admin/products"); // ✅ redirect to product list after adding
    } catch (error) {
      console.error("❌ Upload failed:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="container mt-3">
      {/* ✅ Back Button */}
      <div className="d-flex align-items-center mb-3 ">
        <button
          type="button"
          className="btn btn-dark text-white btn-outline-secondary me-2"
         
           onClick={() => navigate("/admin")} 
        >
          ← Back
        </button>
        <div className="align-items-center" style={{marginLeft:"35%"}}>
        <h2 className="m-0 ">Add Product</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Subcategory"
              value={product.subcategory}
              onChange={(e) =>
                setProduct({ ...product, subcategory: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="SKU"
              value={product.sku}
              onChange={(e) =>
                setProduct({ ...product, sku: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="row mb-3">
          <div className="col-md-6">
            <textarea
              className="form-control"
              placeholder="Short Description"
              value={product.shortDescription}
              onChange={(e) =>
                setProduct({ ...product, shortDescription: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <textarea
              className="form-control"
              placeholder="Full Description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
        </div>

        {/* Fabric & Stock */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Fabric"
              value={product.fabric}
              onChange={(e) =>
                setProduct({ ...product, fabric: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Stock"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: parseInt(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Colors & Sizes */}
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Add Color"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={addColor}
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {product.colors.map((c, i) => (
                <span key={i} className="badge bg-secondary me-1">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Add Size"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={addSize}
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {product.sizes.map((s, i) => (
                <span key={i} className="badge bg-info me-1">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Discount */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Discount (%)"
              value={product.discount}
              onChange={(e) =>
                setProduct({
                  ...product,
                  discount: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>

        {/* Tags & Occasion */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Tags (comma separated)"
              value={product.tags}
              onChange={(e) =>
                setProduct({ ...product, tags: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Occasion"
              value={product.occasion}
              onChange={(e) =>
                setProduct({ ...product, occasion: e.target.value })
              }
            />
          </div>
        </div>

        {/* Gender */}
        <div className="row mb-3">
          <div className="col-md-6">
            <select
              className="form-select"
              value={product.gender}
              onChange={(e) =>
                setProduct({ ...product, gender: e.target.value })
              }
              required
            >
              <option value="">Select Gender</option>
              <option value="Men">Male</option>
              <option value="Women">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* Images */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Main Image:</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setMainImage(e.target.files[0])}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Gallery Images:</label>
            <input
              type="file"
              multiple
              className="form-control"
              onChange={handleGalleryChange}
            />
            <div className="mt-2">
              {galleryImages.map((file, i) => (
                <span key={i} className="badge bg-success me-1">
                  {file.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
