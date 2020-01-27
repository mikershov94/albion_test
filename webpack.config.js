const path = require('path');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

module.exports = {
    
    entry: {
        app: PATHS.src + '/index.js',
    },

    output: {
        filename: 'js/[name].js',
        path: PATHS.dist
    },

}