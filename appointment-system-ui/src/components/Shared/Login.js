import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tckn, setTckn] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let userData = {};
      if (userType === "doctor" && id) {
        const response = await axios.get(`/doctor/${id}`);
        userData = response.data;
        console.log("Doktor verisi:", userData);
        navigate("/doctor", { state: userData });
      } else if (userType === "patient" && tckn) {
        const response = await axios.get(`/patient/tckn/${tckn}`);
        userData = response.data;
        console.log("Hasta verisi:", userData);
        navigate('/patient', { state: userData });
      } else if (userType === "admin" && username === "admin" && password === "sifre123") {
        navigate("/admin");
      } else {
        alert("Lütfen geçerli bilgileri girin.");
      }
    } catch (error) {
      alert("Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyin.");
      console.error("Hata detayları:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <h1 className="login-title">Giriş Ekranı</h1>
        <select onChange={(e) => setUserType(e.target.value)} value={userType}>
          <option value="">Kullanıcı Seçin</option>
          <option value="doctor">Doktor</option>
          <option value="patient">Hasta</option>
          <option value="admin">Admin</option>
        </select>

        {userType === "patient" && (
          <>
            <input
              type="text"
              placeholder="Ad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Soyad"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
              <input
                type="text"
                placeholder="TCKN"
                value={tckn}
                onChange={(e) => setTckn(e.target.value)}
              />          
          </>
        )}
        {userType === "doctor" && (
          <>
            <input
                type="text"
                placeholder="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
          </>
        )}

        {userType === "admin" && (
          <>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        <button onClick={handleLogin} className="login-button">
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

export default Login;
