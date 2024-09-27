module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transform your .js and .jsx files
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        "/node_modules/(?!(axios)/)" // This allows transformation of axios
    ],
};
