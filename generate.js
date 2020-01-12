const fs = require("fs");
const path = require("path");
const xml = require("xml2js");

const parser = new xml.Parser({
    explicitRoot: true,
    explicitArray: false,
    explicitChildren: false,
});

const svgDir = `${__dirname}/MaterialDesign/svg`;
const outDir = `${__dirname}/package`;

const fileNames = fs.readdirSync(svgDir);

for (const fileName of fileNames) {
    const index = fileName.lastIndexOf(".");
    const baseName = fileName.substring(0, index);
    const extName = fileName.substring(index + 1);
    if (extName == "svg") {
        const contents = fs.readFileSync(path.join(svgDir, fileName), { encoding: "utf8" });
        parser.parseString(contents, (error, document) => {
            if (error) {
                console.error(error);
            }
            else {
                const d = document.svg.path.$.d;
                fs.writeFileSync(path.join(outDir, `${baseName}.js`), `module.exports = "${d}";\n`);
                fs.writeFileSync(path.join(outDir, `${baseName}.d.ts`), `declare const path: string; export default path;\n`);
            }
        });
    }
}
