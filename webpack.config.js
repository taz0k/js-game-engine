var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/app.tsx",
    output: {
        filename: "app.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    // TODO. What does "resolve" do ???
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [

            // for TypeScript
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },


            // for SASS
            {
              test: /\.(css|scss|sass)$/,
              loader: 'style-loader!css-loader!sass-loader',
              include: [path.join(__dirname, "src"), path.join(__dirname, "node_modules/font-awesome")]
            },


            // for Font Awesome
            {
              test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
              include: path.join(__dirname, "node_modules/font-awesome"),
              loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
              test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
              include: path.join(__dirname, "node_modules/font-awesome"),
              loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              include: path.join(__dirname, "node_modules/font-awesome"),
              loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              include: path.join(__dirname, "node_modules/font-awesome"),
              loader: "file-loader"
            },
            {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              include: path.join(__dirname, "node_modules/font-awesome"),
              loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
      contentBase: path.join(__dirname, '/'),
      inline: true,
      hot: true
    }
};
