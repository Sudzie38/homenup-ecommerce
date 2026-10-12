const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public klasörünü site olarak kullan
app.use(express.static(path.join(__dirname, "public")));

// Ana sayfa
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "odeme.html"));
});

// Test
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "HOMENUP server çalışıyor."
    });
});

app.listen(PORT, () => {
    console.log(`HOMENUP server http://localhost:${PORT} adresinde çalışıyor.`);
});