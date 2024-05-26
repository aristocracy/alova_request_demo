const postcssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const pxtovw = require("@yuo/postcss-px2vw");

const px2vp_cfg = pxtovw({
	viewportWidth: 800,
	fontViewportUnit: "vw",
	viewportUnit: "vw",
	include: [/\/src\/views\/styles\//, /\/src\/components\/styles\//],
});
module.exports = {
	syntax: "postcss-less",
	map: process.env.NODE_ENV === "development" ? "inline" : false,
	plugins: [postcssImport, autoprefixer, px2vp_cfg],
};