import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const makeSvg = ({ bg, fg, accent }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="224" fill="${bg}"/>
  <path d="M 260 684 V 340 L 448 540 L 636 340 V 684"
        fill="none" stroke="${fg}" stroke-width="104"
        stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 790 352 V 672"
        fill="none" stroke="${accent}" stroke-width="104" stroke-linecap="round"/>
</svg>`;

const variants = {
	light: { bg: "#eef3f9", fg: "#101418", accent: "#3f8fe0" },
	dark: { bg: "#101418", fg: "#f4f7fb", accent: "#63b3ff" },
};

const outDir = path.join(process.cwd(), "public", "favicon");
await fs.mkdir(outDir, { recursive: true });

for (const [name, colors] of Object.entries(variants)) {
	const svg = Buffer.from(makeSvg(colors));
	for (const size of [32, 128, 180, 192]) {
		const file = path.join(outDir, `favicon-${name}-${size}.png`);
		await sharp(svg).resize(size, size).png().toFile(file);
		console.log(`wrote ${file}`);
	}
}
