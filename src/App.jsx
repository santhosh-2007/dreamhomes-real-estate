
import { useMemo, useState } from "react";
import "./App.css";

const properties = [
  {
    id: 1,
    title: "Oceanfront Signature Villa",
    location: "ECR, Chennai",
    city: "Chennai",
    price: 42500000,
    type: "Villa",
    beds: 5,
    baths: 5,
    area: 4800,
    tag: "Exclusive",
    image: "photo-1613490493576-7fde63acd811",
    description: "An architectural statement with expansive sea views, an infinity pool and exceptional indoor-outdoor living.",
    lat: 12.91,
    lng: 80.25,
  },
  {
    id: 2,
    title: "The Grand Estate",
    location: "Whitefield, Bengaluru",
    city: "Bengaluru",
    price: 19500000,
    type: "House",
    beds: 5,
    baths: 4,
    area: 3600,
    tag: "Featured",
    image: "photo-1600047509807-ba8f99d2cdde",
    description: "A beautifully proportioned family estate with generous living spaces, refined finishes and a landscaped garden.",
    lat: 12.9698,
    lng: 77.75,
  },
  {
    id: 3,
    title: "Skyline Penthouse",
    location: "Anna Nagar, Chennai",
    city: "Chennai",
    price: 12000000,
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: 2400,
    tag: "New Listing",
    image: "photo-1600607687939-ce8a6c25118c",
    description: "A contemporary urban residence featuring open-plan interiors, city views and thoughtfully designed spaces.",
    lat: 13.085,
    lng: 80.21,
  },
  {
    id: 4,
    title: "Azure Beach Retreat",
    location: "Kovalam, Chennai",
    city: "Chennai",
    price: 35000000,
    type: "Villa",
    beds: 6,
    baths: 6,
    area: 5200,
    tag: "Premium",
    image: "photo-1600607687920-4e2a09cf159d",
    description: "A resort-inspired retreat with a private pool, open terraces and relaxed coastal architecture.",
    lat: 12.79,
    lng: 80.25,
  },
  {
    id: 5,
    title: "The Garden Residence",
    location: "Saravanampatti, Coimbatore",
    city: "Coimbatore",
    price: 7800000,
    type: "House",
    beds: 3,
    baths: 3,
    area: 2100,
    tag: "Great Value",
    image: "photo-1600566753086-00f18fb6b3ea",
    description: "A welcoming modern home with natural light, comfortable bedrooms and a peaceful residential setting.",
    lat: 11.081,
    lng: 76.998,
  },
  {
    id: 6,
    title: "The Grand City Suite",
    location: "Peelamedu, Coimbatore",
    city: "Coimbatore",
    price: 5600000,
    type: "Apartment",
    beds: 2,
    baths: 2,
    area: 1450,
    tag: "New Listing",
    image: "photo-1600566753190-17f0baa2a6c3",
    description: "A polished contemporary apartment offering practical layouts and convenient access to city amenities.",
    lat: 11.024,
    lng: 77.002,
  },
];

const photoUrl = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const formatPrice = (price) =>
  price >= 10000000
    ? `₹${(price / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`
    : `₹${(price / 100000).toFixed(0)} Lakh`;

function App() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Any");
  const [budget, setBudget] = useState("Any");
  const [beds, setBeds] = useState("Any");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selected, setSelected] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = useMemo(() => properties.filter((p) => {
    const text = `${p.title} ${p.location} ${p.city}`.toLowerCase();
    return (
      text.includes(search.toLowerCase()) &&
      (type === "Any" || p.type === type) &&
      (budget === "Any" || p.price <= Number(budget)) &&
      (beds === "Any" || p.beds >= Number(beds)) &&
      (!showFavorites || favorites.includes(p.id))
    );
  }), [search, type, budget, beds, showFavorites, favorites]);

  const toggleFavorite = (id) => {
    setFavorites((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setType("Any");
    setBudget("Any");
    setBeds("Any");
    setShowFavorites(false);
  };

  const openProperty = (p) => {
    setSelected(p);
    setActiveImage(0);
  };

  return (
    <div className="site">
      <header className="navbar">
        <a className="logo" href="#home">
          <span className="logo-mark">⌂</span>
          <span>
            <strong>DreamHomes</strong>
            <small>LUXURY REAL ESTATE</small>
          </span>
        </a>

        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? "✕" : "☰"}
        </button>

        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          {["Home", "Properties", "About", "Services", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)}>
              {item}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className={showFavorites ? "icon-button active" : "icon-button"}
            title="View saved properties"
            onClick={() => {
              setShowFavorites(!showFavorites);
              document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            ♡ <span className="favorite-count">{favorites.length}</span>
          </button>
          <a className="outline-button" href="#contact">Get Started ↗</a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-bg"
            src={photoUrl("photo-1613490493576-7fde63acd811", 2000)}
            alt="Luxury contemporary villa"
          />
          <div className="hero-shade" />

          <div className="hero-copy">
            <span className="eyebrow"><i /> FIND YOUR DREAM HOME</span>
            <h1>Luxury Living,<br /><em>Redefined.</em></h1>
            <p>
              Discover exceptional properties in the world's most desirable
              locations. Find a home that reflects your lifestyle and your
              ambitions.
            </p>
            <a className="watch-link" href="#about">
              <span className="play-icon">▶</span> Discover our story
            </a>
          </div>

          <div className="hero-property">
            <span className="gold-label">FEATURED RESIDENCE</span>
            <strong>Oceanfront Signature Villa</strong>
            <span>⌖ ECR, Chennai <b>·</b> 01 / 06</span>
          </div>

          <div className="search-panel">
            <label className="search-field location-field">
              <span className="field-icon">⌖</span>
              <span><small>LOCATION</small>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="City or neighbourhood"
                />
              </span>
            </label>

            <label className="search-field">
              <span className="field-icon">⌂</span>
              <span><small>PROPERTY TYPE</small>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Any">Any property</option>
                  <option value="Villa">Luxury villa</option>
                  <option value="House">Independent house</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </span>
            </label>

            <label className="search-field">
              <span className="field-icon">₹</span>
              <span><small>MAXIMUM BUDGET</small>
                <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                  <option value="Any">Any budget</option>
                  <option value="6000000">Up to ₹60 lakh</option>
                  <option value="10000000">Up to ₹1 crore</option>
                  <option value="20000000">Up to ₹2 crore</option>
                  <option value="40000000">Up to ₹4 crore</option>
                </select>
              </span>
            </label>

            <label className="search-field">
              <span className="field-icon">▤</span>
              <span><small>BEDROOMS</small>
                <select value={beds} onChange={(e) => setBeds(e.target.value)}>
                  <option value="Any">Any</option>
                  <option value="2">2+ bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                </select>
              </span>
            </label>

            <button className="gold-button search-button" onClick={() => {
              document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
            }}>
              ⌕ <span>Search</span>
            </button>
          </div>
        </section>

        <section className="trust-strip">
          <div><span className="trust-icon">♙</span><span><strong>Trusted Expertise</strong><small>Personalised guidance</small></span></div>
          <div><span className="trust-icon">⌂</span><span><strong>Exceptional Homes</strong><small>Carefully selected</small></span></div>
          <div><span className="trust-icon">◇</span><span><strong>Secure Process</strong><small>Support at every step</small></span></div>
          <div><span className="trust-icon">♧</span><span><strong>Dedicated Service</strong><small>Here when you need us</small></span></div>
          <div><span className="trust-icon">◎</span><span><strong>Local Knowledge</strong><small>Explore your city</small></span></div>
        </section>

        <section className="properties section" id="properties">
          <div className="section-top">
            <div>
              <span className="eyebrow dark-eyebrow"><i /> OUR COLLECTION</span>
              <h2>{showFavorites ? "Your Saved " : "Discover Our "}<em>{showFavorites ? "Properties" : "Premium Listings"}</em></h2>
              <p>Explore distinctive properties chosen for their character, comfort and design.</p>
            </div>
            <button className="outline-light" onClick={resetFilters}>View All Properties ↗</button>
          </div>

          <div className="listing-toolbar">
            <span><strong>{filtered.length.toString().padStart(2, "0")}</strong> properties available</span>
            {(search || type !== "Any" || budget !== "Any" || beds !== "Any" || showFavorites) &&
              <button onClick={resetFilters}>Clear all filters ×</button>}
          </div>

          <div className="property-grid">
            {filtered.map((p) => (
              <article className="property-card" key={p.id}>
                <div className="property-image-wrap">
                  <img src={photoUrl(p.image)} alt={p.title} loading="lazy" />
                  <span className="property-tag">{p.tag}</span>
                  <button
                    className={favorites.includes(p.id) ? "heart saved" : "heart"}
                    onClick={() => toggleFavorite(p.id)}
                    aria-label="Toggle favourite"
                  >{favorites.includes(p.id) ? "♥" : "♡"}</button>
                  <span className="image-price">{formatPrice(p.price)}</span>
                  <button className="quick-view" onClick={() => openProperty(p)}>Explore Residence ↗</button>
                </div>
                <div className="property-info">
                  <span className="property-location">⌖ {p.location}</span>
                  <h3>{p.title}</h3>
                  <div className="property-facts">
                    <span>▤ {p.beds} Beds</span>
                    <span>♧ {p.baths} Baths</span>
                    <span>↗ {p.area.toLocaleString("en-IN")} Sq Ft</span>
                  </div>
                  <button className="details-link" onClick={() => openProperty(p)}>
                    View property details <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <h3>No matching residences</h3>
              <p>Try another location or adjust your filters.</p>
              <button className="gold-button" onClick={resetFilters}>Show all properties</button>
            </div>
          )}
        </section>

        <section className="story" id="about">
          <div className="story-image">
            <img src={photoUrl("photo-1600607687939-ce8a6c25118c", 1200)} alt="Luxury home interior" loading="lazy" />
            <div className="image-caption"><span>THE ART OF LIVING WELL</span><strong>Spaces that inspire.</strong></div>
          </div>
          <div className="story-copy">
            <span className="eyebrow"><i /> MORE THAN REAL ESTATE</span>
            <h2>Not just a property.<br /><em>A way of life.</em></h2>
            <p>We believe finding a home should feel as exceptional as living in one. Our curated collection brings together distinctive spaces and personalised guidance.</p>
            <a className="text-link" href="#services">Discover our approach ↗</a>
            <div className="stats">
              <div><strong>500+</strong><small>Homes explored</small></div>
              <div><strong>12+</strong><small>Local markets</small></div>
              <div><strong>1:1</strong><small>Personal guidance</small></div>
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="center-heading">
            <span className="eyebrow dark-eyebrow"><i /> THE DREAMHOMES DIFFERENCE</span>
            <h2>Every detail, <em>considered.</em></h2>
            <p>Thoughtful support for every step of your property journey.</p>
          </div>
          <div className="service-grid">
            <article><span>01</span><div className="service-icon">⌂</div><h3>Curated Properties</h3><p>Discover distinctive residences selected around your needs and lifestyle.</p></article>
            <article><span>02</span><div className="service-icon">◇</div><h3>Personal Guidance</h3><p>Explore options with clear information and support throughout your search.</p></article>
            <article><span>03</span><div className="service-icon">◎</div><h3>Location Discovery</h3><p>Explore neighbourhoods and property locations before planning a visit.</p></article>
          </div>
        </section>

        <section className="map-section section" id="contact">
          <div className="section-top">
            <div>
              <span className="eyebrow dark-eyebrow"><i /> FIND YOUR PLACE</span>
              <h2>Explore by <em>location.</em></h2>
              <p>Discover our featured markets across South India.</p>
            </div>
          </div>
          <div className="map-layout">
            <div className="map-list">
              {properties.map((p) => (
                <button key={p.id} className="map-list-item" onClick={() => openProperty(p)}>
                  <span className="map-symbol">⌖</span>
                  <span><strong>{p.title}</strong><small>{p.location}</small></span>
                  <b>{formatPrice(p.price)} ↗</b>
                </button>
              ))}
            </div>
            <iframe
              title="Explore South India on OpenStreetMap"
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.5%2C10.5%2C81.0%2C13.6&layer=mapnik"
              loading="lazy"
            />
          </div>
          <p className="map-note">Map © OpenStreetMap contributors. Property listings and prices are sample data for this demonstration.</p>
        </section>

        <section className="contact-banner">
          <span className="eyebrow">YOUR NEXT CHAPTER BEGINS HERE</span>
          <h2>Some places just <em>feel like home.</em></h2>
          <p>Let your next great story begin with the right address.</p>
          <a className="gold-button" href="mailto:hello@dreamhomes.example">Start Your Search ↗</a>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#home"><span className="logo-mark">⌂</span><span><strong>DreamHomes</strong><small>LUXURY REAL ESTATE</small></span></a>
        <p>Exceptional spaces. Thoughtfully discovered.</p>
        <span>© {new Date().getFullYear()} DreamHomes · Academic demo</span>
      </footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="property-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <img className="modal-image" src={photoUrl(selected.image, 1200)} alt={selected.title} />
            <div className="modal-body">
              <span className="eyebrow dark-eyebrow">{selected.tag} · {selected.type}</span>
              <h2>{selected.title}</h2>
              <p className="modal-location">⌖ {selected.location}</p>
              <strong className="modal-price">{formatPrice(selected.price)}</strong>
              <div className="modal-facts">
                <span>{selected.beds} Bedrooms</span><span>{selected.baths} Bathrooms</span><span>{selected.area.toLocaleString("en-IN")} Sq Ft</span>
              </div>
              <p className="modal-description">{selected.description}</p>
              <a
                className="gold-button"
                target="_blank"
                rel="noreferrer"
                href={`https://www.openstreetmap.org/?mlat=${selected.lat}&mlon=${selected.lng}#map=15/${selected.lat}/${selected.lng}`}
              >View Location on Map ↗</a>
              <button className="modal-save" onClick={() => toggleFavorite(selected.id)}>
                {favorites.includes(selected.id) ? "♥ Saved to favourites" : "♡ Save to favourites"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;