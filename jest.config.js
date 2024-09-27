module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // This will use babel-jest to transform your .js and .jsx files
    },
    testEnvironment: 'jsdom', // This is important for React testing
};
