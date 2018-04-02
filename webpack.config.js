const path = require("path");

const tsImportPluginFactory = require('ts-import-plugin');

const babelLoader = {
    loader: "babel-loader",
    options: {
        cacheDirectory: true,
        presets: [
            "react"
        ]
    }
};

const tsLoader = {
    loader: "ts-loader",
    options: {
        getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true
            })]
        }),
    }
};

module.exports = {
    entry: "./src/main.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    babelLoader,
                    tsLoader
                ]
            },

            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            { test: /\.css$/, use: ['style-loader', 'css-loader'] },

            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            modifyVars: { "@primary-color": "#1DA57A" }
                        }
                    }
                ]
            }
        ]
    },

    /*externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/
};