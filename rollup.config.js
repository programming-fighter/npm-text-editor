import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.tsx",
  output: [
    { file: "dist/index.cjs.js", format: "cjs", sourcemap: true },
    { file: "dist/index.esm.js", format: "esm", sourcemap: true },
  ],
  plugins: [
    // Remove "use client"
    replace({
      preventAssignment: true,
      delimiters: ["", ""],
      values: { '"use client";': "" },
    }),

    // Resolve and CommonJS plugins
    resolve(),
    commonjs(),

    // Handle CSS imports
    postcss({
      extract: true,   // generates dist/index.css
      minimize: true,
    }),

    // TS plugin
    typescript(),
  ],
  external: ["react", "react-dom"],
};
