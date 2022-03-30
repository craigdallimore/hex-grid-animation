import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import sourcemaps from "rollup-plugin-sourcemaps";
import livereload from "rollup-plugin-livereload";

export default {
  input: "src/main.ts",
  output: {
    file: "static/bundle.js",
  },
  plugins: [typescript(), serve("static"), sourcemaps(), livereload()],
};
