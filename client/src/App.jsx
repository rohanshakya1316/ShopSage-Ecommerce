import { useMemo, useState } from 'react'
import {
  Award,
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react'
import heroImg from './assets/hero.png'
import './App.css'

const product = {
  name: 'Astra Trail Sneaker',
  brand: 'ShopSage Studio',
  category: 'Men / Shoes / Sneakers',
  price: 129.99,
  originalPrice: 159.99,
  rating: 4.8,
  reviewCount: 284,
  soldCount: '1.2k+',
  sku: 'SS-ATS-4092',
  model: 'ASTRA-TRAIL-24',
  availability: 'In stock',
  delivery: 'Deliver to Dhaka - Tue, 9 Jul',
  shortDescription:
    'A lightweight everyday sneaker built for city walks, weekend errands, and all-day comfort with a clean, modern profile.',
  description:
    'The Astra Trail Sneaker pairs breathable mesh, soft cushioning, and a durable outsole into one versatile silhouette. Designed for comfort and style, it transitions easily from workday commutes to weekend plans.',
  seller: {
    name: 'ShopSage Mall',
    rating: 98,
    response: '92%',
    followers: '8.4k',
  },
  features: [
    'Breathable engineered mesh upper',
    'Responsive foam midsole for all-day comfort',
    'Traction-focused rubber outsole',
    'Padded collar and heel support',
  ],
  colors: ['Stone', 'Midnight', 'Olive', 'Sand'],
  sizes: ['6', '7', '8', '9', '10', '11'],
  highlights: [
    'Free shipping over $75',
    '30-day returns',
    '1-year comfort guarantee',
  ],
  details: [
    ['Brand', 'ShopSage Studio'],
    ['Type', 'Lifestyle sneaker'],
    ['Upper', 'Engineered mesh'],
    ['Outsole', 'High-grip rubber'],
    ['Fit', 'True to size'],
    ['Warranty', '12 months'],
  ],
}

const productPhotos = [
  {
    title: 'Hero view',
    image: heroImg,
  },
  {
    title: 'Side profile',
    image: heroImg,
  },
  {
    title: 'Heel support',
    image: heroImg,
  },
  {
    title: 'Outsole detail',
    image: heroImg,
  },
]

function App() {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [activeTab, setActiveTab] = useState('description')
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  const savings = useMemo(
    () => (product.originalPrice - product.price).toFixed(2),
    [],
  )

  const selectedPhoto = productPhotos[selectedPhotoIndex]

  return (
    <main className="product-page">
      <header className="market-header">
        <div>
          <p className="breadcrumb">Home / {product.category} / {product.name}</p>
          <h2>Marketplace-style product page</h2>
        </div>
        <div className="header-pills">
          <span>Free delivery</span>
          <span>Cash on delivery</span>
          <span>Easy returns</span>
        </div>
      </header>

      <section className="product-shell">
        <div className="product-gallery">
          <div className="product-hero-card">
            <div className="product-badge">
              <Award size={16} />
              Best seller
            </div>
            <div className="hero-frame">
              <img
                src={selectedPhoto.image}
                alt={`${product.name} - ${selectedPhoto.title}`}
                className="product-image"
              />
            </div>
            <div className="image-caption">
              <strong>{selectedPhoto.title}</strong>
              <span>{product.soldCount} sold this month</span>
            </div>
          </div>

          <div className="product-thumbs" aria-label="Product photo thumbnails">
            {productPhotos.map((photo, index) => (
              <button
                key={photo.title}
                className={`thumb-card ${selectedPhotoIndex === index ? 'active' : ''}`}
                type="button"
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <img src={photo.image} alt={photo.title} />
                <span>{photo.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="product-content">
          <div className="product-topline">
            <div className="brand-stack">
              <span className="brand-chip">{product.brand}</span>
              <span className="subtle-text">Official store • 4.8★ rated</span>
            </div>
            <button className="icon-button" type="button" aria-label="Share product">
              <Share2 size={18} />
            </button>
          </div>

          <h1>{product.name}</h1>

          <div className="rating-row">
            <div className="stars" aria-label={`${product.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={16} className={index < Math.round(product.rating) ? 'filled' : ''} />
              ))}
            </div>
            <span>{product.rating}</span>
            <span>•</span>
            <span>{product.reviewCount} reviews</span>
            <span>•</span>
            <span>{product.soldCount} sold</span>
            <span>•</span>
            <span>{product.availability}</span>
          </div>

          <p className="product-summary">{product.shortDescription}</p>

          <ul className="key-points">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div className="product-info-grid">
            <div className="info-card price-card">
              <div className="price-row">
                <div>
                  <span className="current-price">${product.price.toFixed(2)}</span>
                  <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                </div>
                <span className="save-pill">Save ${savings}</span>
              </div>

              <div className="deal-row">
                <span>Special offer</span>
                <strong>10% off with selected card</strong>
              </div>
              <div className="deal-row">
                <span>EMI</span>
                <strong>From $21.66/mo</strong>
              </div>
            </div>

            <div className="info-card delivery-card">
              <div className="info-title">
                <Truck size={18} />
                <strong>Delivery options</strong>
              </div>
              <p>{product.delivery}</p>
              <p>Cash on delivery available in selected areas.</p>
            </div>
          </div>

          <div className="selection-group">
            <div className="selection-header">
              <strong>Color</strong>
              <span>{selectedColor}</span>
            </div>
            <div className="pill-grid" role="list">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`choice-pill ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="selection-group selection-inline">
            <div className="selection-header">
              <strong>Size</strong>
              <span>US {selectedSize}</span>
            </div>
            <div className="size-grid">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-pill ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="buy-box">
            <div className="quantity-row compact">
              <span>Quantity</span>
              <div className="quantity-control">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                >
                  <Minus size={16} />
                </button>
                <strong>{quantity}</strong>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((value) => value + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="cta-row stacked">
              <button className="primary-cta" type="button">
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="secondary-cta" type="button">
                <Heart size={18} />
                Buy Now
              </button>
            </div>

            <div className="trust-row">
              <div>
                <ShieldCheck size={18} />
                <span>Secure transaction</span>
              </div>
              <div>
                <Truck size={18} />
                <span>Fast delivery</span>
              </div>
            </div>
          </div>

          <div className="seller-card info-card">
            <div className="info-title">
              <Award size={18} />
              <strong>Sold by {product.seller.name}</strong>
            </div>
            <div className="seller-metrics">
              <span>{product.seller.rating}% positive</span>
              <span>{product.seller.response} response</span>
              <span>{product.seller.followers} followers</span>
            </div>
          </div>

          <div className="tab-card">
            <div className="tab-list" role="tablist" aria-label="Product information tabs">
              {[
                ['description', 'Description'],
                ['features', 'Features'],
                ['shipping', 'Shipping'],
                ['details', 'Details'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={activeTab === key ? 'active' : ''}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="tab-panel">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'features' && (
                <ul>
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'shipping' && (
                <ul>
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'details' && (
                <div className="details-grid">
                  {product.details.map(([label, value]) => (
                    <div key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="spec-card info-card">
            <div className="info-title">
              <strong>Specifications</strong>
            </div>
            <div className="spec-grid">
              <div>
                <span>SKU</span>
                <strong>{product.sku}</strong>
              </div>
              <div>
                <span>Model</span>
                <strong>{product.model}</strong>
              </div>
              <div>
                <span>Selected</span>
                <strong>
                  {selectedColor} / US {selectedSize}
                </strong>
              </div>
              <div>
                <span>Availability</span>
                <strong>{product.availability}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related-section">
        <div className="section-heading">
          <h3>Frequently bought with similar styles</h3>
          <p>Marketplace-style cross-sell block, just like a real product page.</p>
        </div>
        <div className="related-grid">
          {[
            'Trail Runner Sock',
            'Waterproof Shoe Spray',
            'Everyday Crew Tee',
            'Urban Backpack',
          ].map((name) => (
            <article key={name} className="related-card">
              <img src={heroImg} alt={name} />
              <strong>{name}</strong>
              <span>$24.99</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
