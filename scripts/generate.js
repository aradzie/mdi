const fs = require("fs");
const Svgo = require("svgo");
const xml = require("xml2js");

// Begin polyfill.
if (!("entries" in Object)) {
    Object.entries = function entries(target) {
        if (target == null) {
            throw new TypeError();
        }
        const object = Object(target);
        const result = [];
        for (const key of Object.keys(object)) {
            result.push([key, object[key]]);
        }
        return result;
    }
}
// End polyfill.

const svgo = new Svgo({});

const parser = new xml.Parser({
    explicitRoot: true,
    explicitArray: false,
    explicitChildren: false,
});

const builder = new xml.Builder({
    renderOpts: {
        "pretty": true,
        "indent": "    ",
        "newline": "\n",
    },
    headless: true,
});

const svgDir = `${__dirname}/../MaterialDesign/icons/svg`;
const outDir = `${__dirname}/../package/icon`;

const fileNames = fs.readdirSync(svgDir);

for (const fileName of fileNames) {
    const n = fileName.lastIndexOf(".");
    const baseName = fileName.substring(0, n);
    const extName = fileName.substring(n + 1);
    if (extName == "svg") {
        const contents = fs.readFileSync(`${svgDir}/${fileName}`, { encoding: "utf8" });
        svgo.optimize(contents, function (result) {
            const { data, info: { width, height } } = result;
            parser.parseString(data, (error, document) => {
                const out = generate(baseName, contents, document);
                fs.writeFileSync(`${outDir}/${baseName}.tsx`, out);
            });
        });
    }
}

function generate(iconName, contents, document) {
    document = rewriteXml(document);
    try {
        validateXml(document.svg);
    }
    catch (ex) {
        console.log("Invalid icon:", iconName);
        return "// File contains invalid SVG content.\n/*\n" + contents + "\n*/\n";
    }
    const children = [];
    for (const [key, value] of Object.entries(document.svg)) {
        if (key != "$") {
            if (Array.isArray(value)) {
                for (const item of value) {
                    children.push(builder.buildObject({ [key]: item }));
                }
            }
            else {
                children.push(builder.buildObject({ [key]: value }));
            }
        }
    }
    return format(iconName, children);
}

function format(iconName, children) {
    const componentName = toPascalCase(iconName);

    return `/* Generated from file ${iconName}.svg. */

import { SvgIcon, SvgIconProps } from "../svg-icon";
import * as React from "react";

const ${componentName}: React.StatelessComponent<SvgIconProps> = (props) => (
    <SvgIcon {...props}>
${children.map(child => indent(child, "        ")).join("\n")}
    </SvgIcon>
);

${componentName}.displayName = "${componentName}";

export default ${componentName};
`;
}

function validateXml(xml) {
    for (const [key, value] of Object.entries(xml)) {
        if (key != "$") {
            if (key != "path") {
                throw new Error("Invalid child element");
            }
        }
    }
}

function rewriteXml(xml) {
    const r = Object.create(null);
    for (const [key, value] of Object.entries(xml)) {
        if (key == "$") {
            r[key] = rewriteXmlAttributes(value);
        }
        else {
            if (Array.isArray(value)) {
                r[key] = value.map(rewriteXml);
            }
            else if (typeof value == "object") {
                r[key] = rewriteXml(value);
            }
            else {
                r[key] = value;
            }
        }
    }
    return r;
}

function rewriteXmlAttributes(xml) {
    const r = Object.create(null);
    for (const [key, value] of Object.entries(xml)) {
        switch (key) {
            case "fill":
            case "fill-rule":
            case "fill-opacity":
            case "opacity":
            case "stroke":
            case "stroke-dasharray":
            case "stroke-linecap":
            case "stroke-linejoin":
            case "stroke-opacity":
            case "stroke-width":
                continue;
        }
        r[toCamelCase(key)] = value;
    }
    return r;
}

function indent(text, indent) {
    return text.split("\n").map(line => indent + line).join("\n");
}

function toCamelCase(name) {
    return name.split(/[-_:]/).map(ucCamelCase).join("");
}

function toPascalCase(name) {
    return name.split(/[-_:]/).map(uc).join("");
}

function ucCamelCase(s, index) {
    return index == 0 ? lc(s) : uc(s);
}

function uc(s) {
    return s.substring(0, 1).toUpperCase() + s.substring(1);
}

function lc(s) {
    return s.substring(0, 1).toLowerCase() + s.substring(1);
}
