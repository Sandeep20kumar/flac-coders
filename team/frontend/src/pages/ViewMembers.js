import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewMembers = () => {
  const [members, setMembers] = useState([]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#f5f7fa",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      fontSize: "2rem",
      color: "#333",
      marginBottom: "30px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "20px",
      width: "100%",
      maxWidth: "1000px",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
    },
    cardBody: {
      padding: "15px",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    name: {
      fontSize: "1.25rem",
      color: "#333",
      margin: "10px 0 5px",
    },
    role: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "15px",
    },
    button: {
      alignSelf: "center",
      backgroundColor: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 20px",
      fontSize: "0.95rem",
      cursor: "pointer",
      transition: "background-color 0.2s, transform 0.2s",
    },
    buttonHover: {
      backgroundColor: "#357ab8",
      transform: "translateY(-2px)",
    },
  };

  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Team Members</h2>
      <div style={styles.grid}>
        {members.map((member) => (
          <div
            key={member._id}
            style={{
              ...styles.card,
              ...(hoveredCard === member._id ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(member._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img
              src={`http://localhost:5000/uploads/${member.image}`}
              alt={member.name}
              style={styles.image}
            />
            <div style={styles.cardBody}>
              <div>
                <h3 style={styles.name}>{member.name}</h3>
                <p style={styles.role}>{member.role}</p>
              </div>
              <Link to={`/members/${member._id}`}>
                <button
                  style={{
                    ...styles.button,
                    ...(hoveredBtn === member._id ? styles.buttonHover : {}),
                  }}
                  onMouseEnter={() => setHoveredBtn(member._id)}
                  onMouseLeave={() => setHoveredBtn(null)}
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMembers;
