import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Reusable style objects
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "40px 60px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center",
      maxWidth: "500px",
      width: "100%",
    },
    header: {
      margin: 0,
      fontSize: "2.5rem",
      color: "#333",
    },
    subtitle: {
      marginTop: "10px",
      fontSize: "1.125rem",
      color: "#666",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
    },
    button: {
      backgroundColor: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "12px 24px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.2s ease, transform 0.2s ease",
      margin: "0 10px",
    },
    buttonHover: {
      backgroundColor: "#357ab8",
      transform: "translateY(-2px)",
    },
  };

  // Local state to track hover (for inline hover effect)
  const [hoveredBtn, setHoveredBtn] = React.useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Welcome to the Student Team Members App</h1>
        <p style={styles.subtitle}>Your team: flac coders</p>

        <div style={styles.buttonContainer}>
          <Link to="/add-member">
            <button
              style={{
                ...styles.button,
                ...(hoveredBtn === "add" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setHoveredBtn("add")}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              Add Member
            </button>
          </Link>
          <Link to="/view-members">
            <button
              style={{
                ...styles.button,
                ...(hoveredBtn === "view" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setHoveredBtn("view")}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              View Members
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
