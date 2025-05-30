const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const { mergePdfs } = require("./merge");
const upload = multer({ dest: "uploads/" });
app.use("/static", express.static(path.join(__dirname, "public"))); // serve static files //for serving static files in express
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async (req, res, next) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).send("Please upload two PDF files.");
    }

    const p1 = path.join(__dirname, req.files[0].path);
    const p2 = path.join(__dirname, req.files[1].path);

    let d = await mergePdfs(p1, p2);
    res.redirect(`/static/${d}.pdf`);
  } catch (err) {
    console.error("Merge error:", err);
    res.status(500).send("An error occurred while merging PDFs.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
