import React, { useState } from "react";
import axios from "axios";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    email: "",
    role: "",
    image: null,
  });

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
      width: "100%",
      maxWidth: "500px",
    },
    header: {
      marginBottom: "20px",
      fontSize: "2rem",
      color: "#333",
      textAlign: "center",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
    },
    label: {
      marginBottom: "5px",
      fontSize: "1rem",
      color: "#555",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
      transition: "border-color 0.2s",
    },
    inputFocus: {
      borderColor: "#4a90e2",
    },
    button: {
      marginTop: "20px",
      width: "100%",
      backgroundColor: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "12px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.2s, transform 0.2s",
    },
    buttonHover: {
      backgroundColor: "#357ab8",
      transform: "translateY(-2px)",
    },
  };

  const [hover, setHover] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/members", data);
      alert("Member added!");
      setFormData({ name: "", rollNo: "", department: "", email: "", role: "", image: null });
    } catch (error) {
      console.error(error);
      alert("Error adding member");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Add New Team Member</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {["name", "rollNo", "department", "email", "role"].map((field) => (
            <div key={field} style={styles.formGroup}>
              <label style={styles.label}>
                {field === "rollNo" ? "Roll Number" : field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                required
                value={formData[field]}
                onChange={handleChange}
                onFocus={() => setFocusedField(field)}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...styles.input,
                  ...(focusedField === field ? styles.inputFocus : {}),
                }}
              />
            </div>
          ))}

          <div style={styles.formGroup}>
            <label style={styles.label}>Photo:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(hover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
