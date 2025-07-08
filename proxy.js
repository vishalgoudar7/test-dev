// proxy.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://beta.devalayas.com",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  })
);

// Optional: serve production React build if you build locally
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(8080, () => console.log("🚀 Proxy server at http://localhost:8080"));
