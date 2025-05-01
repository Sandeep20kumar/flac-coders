import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MemberDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      maxWidth: "600px",
      width: "100%",
      textAlign: "center",
    },
    header: {
      fontSize: "2rem",
      color: "#333",
      marginBottom: "20px",
    },
    image: {
      width: "100%",
      maxWidth: "300px",
      height: "300px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px 30px",
      marginTop: "20px",
      textAlign: "left",
    },
    label: {
      fontWeight: 600,
      color: "#555",
    },
    value: {
      color: "#333",
    },
    idText: {
      marginTop: "30px",
      fontSize: "0.875rem",
      color: "#888",
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/members/${id}`)
      .then((res) => setMember(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!member)
    return (
      <div style={{ ...styles.container, textAlign: "center" }}>
        <p>Loading member details…</p>
      </div>
    );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>{member.name}</h2>
        <img
          src={`http://localhost:5000/uploads/${member.image}`}
          alt={member.name}
          style={styles.image}
        />

        <div style={styles.infoGrid}>
          <div>
            <p style={styles.label}>Roll Number:</p>
            <p style={styles.value}>{member.rollNo}</p>
          </div>
          <div>
            <p style={styles.label}>Department:</p>
            <p style={styles.value}>{member.department}</p>
          </div>
          <div>
            <p style={styles.label}>Email:</p>
            <p style={styles.value}>{member.email}</p>
          </div>
          <div>
            <p style={styles.label}>Role:</p>
            <p style={styles.value}>{member.role}</p>
          </div>
        </div>

        <p style={styles.idText}>Member ID: {member._id}</p>
      </div>
    </div>
  );
};

export default MemberDetails;
