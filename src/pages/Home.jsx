import logo from "assets/logo512.png";

export default function Home() {
  return (
    <div className="page-container">
      <div className="layout-center">
        {/* temp element */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <img src={logo} alt="" width="40%" />
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "18px",
            color: "#4B928F",
          }}
        >
          Discover New Music
        </p>
      </div>
    </div>
  );
}
