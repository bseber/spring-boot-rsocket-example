/* eslint-env node */
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import virtual from "@rollup/plugin-virtual";
import commonjs from "@rollup/plugin-commonjs";
import rimraf from "rimraf";

const paths = {
    src: "src/main/javascript",
    dist: "target/classes/static/js",
};

export default {
    input: {
        socket: `${paths.src}/socket.js`,
    },
    output: {
        dir: paths.dist,
        format: "es",
        sourcemap: true,
    },
    plugins: [
        {
            name: "clean",
            buildStart() {
                rimraf.sync(paths.dist);
            },
        },
        replace({
            preventAssignment: true,
            values: {
                "process.env.NODE_ENV": JSON.stringify("production"),
            },
        }),
        virtual({
            // ```
            // (!) Unresolved dependencies
            // https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
            // buffer (imported by buffer?commonjs-external)
            // ```
            // empty Buffer polyfill to instruct rsocket to use LiteBuffer
            buffer:
                "/** empty buffer due to rsocket. see rollup.config.js for more detail. */ export default {}",
        }),
        resolve({
            preferBuiltins: false,
        }),
        commonjs(),
    ],
};
