const PDFMerger = require("pdf-merger-js").default;

var merger = new PDFMerger();

const mergePdfs = async (p1, p2) => {
  const merger = new PDFMerger(); // Create a new merger per call
  await merger.add(p1);
  await merger.add(p2);

  const outputDir = path.join(__dirname, "public");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filename = `${new Date().getTime()}.pdf`;
  const outputPath = path.join(outputDir, filename);
  await merger.save(outputPath);

  return filename;
};
module.exports = { mergePdfs };
