import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page" style={{ fontFamily: "Arial, sans-serif" }}>

      {/* HERO SECTION */}
      <section
        className="hero"
        style={{
          height: "70vh",
          background: "url('/image/hero-fish-bg.jpg') center/cover no-repeat",
          position: "relative",
          borderRadius: "0 0 25px 25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}
      >
        <div
          className="hero-overlay"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(1px)"
          }}
        ></div>

        <div
          className="hero-content"
          style={{ position: "relative", textAlign: "center", maxWidth: "700px" }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
            Fresh Fish Direct from Fishermen
          </h1>
          <p style={{ fontSize: "1.2rem", opacity: "0.9", marginBottom: "20px" }}>
            Buy fresh fish delivered to your home at the best price.
          </p>

          <div
            className="hero-buttons"
            style={{ display: "flex", justifyContent: "center", gap: "15px" }}
          >
            <Link
              to="/market"
              style={{
                background: "#005effff",
                padding: "12px 22px",
                borderRadius: "10px",
                color: "white",
                fontSize: "17px",
                textDecoration: "none"
              }}
            >
              Buy Fish
            </Link>

            <Link
              to="/register"
              style={{
                border: "2px solid white",
                padding: "12px 22px",
                borderRadius: "10px",
                color: "white",
                fontSize: "17px",
                textDecoration: "none"
              }}
            >
              Sell Fish
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
<section style={{ padding: "50px 20px", textAlign: "center" }}>
  <h2 style={{ fontSize: "2.2rem", marginBottom: "25px" }}>
    Why Choose Mach Lagbe?
  </h2>

  <div
    className="feature-grid"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px"
    }}
  >
    {/* Fisherman */}
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}
    >
      <img
        src="/image/download.webp"
        alt="Fisherman"
        style={{ width: "60px", height: "60px", marginBottom: "15px" }}
      />
      <h3>Direct from Fishermen</h3>
      <p>Get fresh fish directly from local fishermen.</p>
    </div>

    {/* Fast Delivery */}
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}
    >
      <img
        src="/image/delivery.jpg"
        alt="Fast Delivery"
        style={{ width: "60px", height: "60px", marginBottom: "15px" }}
      />
      <h3>Fast Delivery</h3>
      <p>Delivered quickly while staying fresh.</p>
    </div>

    {/* Best Price */}
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}
    >
      <img
        src="/image/bestprice.jpg"
        alt="Best Price"
        style={{ width: "60px", height: "60px", marginBottom: "15px" }}
      />
      <h3>Best Price</h3>
      <p>Competitive prices with no middlemen.</p>
    </div>
  </div>
</section>


      {/* POPULAR FISH */}
      <section style={{ padding: "50px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", marginBottom: "30px" }}>
          Popular Fish Varieties
        </h2>

        <div
          className="fish-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px"
          }}
        >
          {/* Ilish */}
          <div
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src="/image/ilish.png"
              alt="Ilish"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />
            <h4>Ilish</h4>
          </div>

          {/* Rui */}
          <div
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src="/image/rui.png"
              alt="Rui"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />
            <h4>Rui</h4>
          </div>

          {/* Chingri */}
          <div
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src="/image/chingri.png"
              alt="Chingri"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />
            <h4>Chingri</h4>
          </div>

          {/* Pangash */}
          <div
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src="/image/pangash.png"
              alt="Pangash"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />
            <h4>Pangash</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
