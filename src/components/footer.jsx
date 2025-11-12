import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

/**
 * Footer.jsx (React + Bootstrap + React Icons)
 * - White background footer
 */

export default function Footer({
  brand = { name: "StyleMart", href: "/" },
  columns = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Releases", href: "/releases" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "/docs" },
        { label: "Blog", href: "/blog" },
        { label: "Community", href: "/community" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  showNewsletter = true,
}) {
  const currentYear = new Date().getFullYear();

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email?.value?.trim();
    if (!email) return;
    alert(`Thanks! We'll keep you updated — ${email}`);
    form.reset();
  }

  return (
    <footer className="bg-white text-dark pt-5 pb-3 mt-5 border-top">
      <div className="container">
        <div className="row">
          {/* Brand + Social */}
          <div className="col-md-4 mb-4">
            <a
              href={brand.href}
              className="d-flex align-items-center mb-3 text-dark text-decoration-none"
            >
              <div
                className="bg-dark rounded-circle d-flex align-items-center justify-content-center me-2 text-white fw-bold"
                style={{ width: "40px", height: "40px" }}
              >
                {brand.name[0]}
              </div>
              <span className="fs-5 fw-bold">{brand.name}</span>
            </a>
            <p className="small text-muted">
              Build beautiful products, ship faster, and delight customers.
              Small footprint, big impact.
            </p>

            <div className="d-flex gap-3">
              <a href="#" className="text-dark">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-dark">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-dark">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-dark">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title} className="col-6 col-md-2 mb-4">
              <h6 className="fw-bold">{col.title}</h6>
              <ul className="list-unstyled">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-dark text-decoration-none small d-block mb-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {showNewsletter && (
            <div className="col-md-4">
              <h6 className="fw-bold">Subscribe</h6>
              <p className="small text-muted">
                Get product updates, tips, and community news — no spam.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="d-flex">
                <input
                  type="email"
                  name="email"
                  placeholder="you@domain.com"
                  required
                  className="form-control me-2"
                />
                <button
                  type="submit"
                  className="btn btn-dark d-flex align-items-center"
                >
                  <MdEmail size={16} className="me-1" /> Join
                </button>
              </form>
            </div>
          )}
        </div>

        
      </div>
     <div className="bg-dark border-top mt-4 pt-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
  <p className="small  text-white mb-3 " style={{ marginLeft: '10%'} }>
    © {currentYear} {brand.name}. All rights reserved.
  </p>
  <div className="mb-3" >
    <a
      href="/terms"
      className="text-white text-decoration-none small me-5"
    >
      Terms
    </a>
    <a
      href="/privacy"
      className="text-white text-decoration-none small me-5"
    >
      Privacy
    </a>
  </div>
</div>

    </footer>
  );
}
