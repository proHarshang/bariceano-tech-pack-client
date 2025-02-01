const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 75, // Change the quality level
                            },
                            pngquant: {
                                quality: [0.65, 0.90], // Set quality range for PNG
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                                optimizationLevel: 3, // Adjust GIF compression level
                            },
                            webp: {
                                quality: 75, // WebP quality level
                            },
                        },
                    },
                ],
            },
        ],
    },
};
