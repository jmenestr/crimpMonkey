const path = require('path');

const SRC_PATH = path.join(__dirname, '../src');

module.exports = {
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
            { test: /\.tsx$/, loader: 'ts-loader', exclude: /node_modules/ },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            }
        ]
    },

    resolve: {
        modules: [SRC_PATH, 'node_modules']
    },

    plugins: []
};
