module.exports = {
  testEnvironment: 'jsdom',
  // Hier sagen wir Jest, dass er Babel für alle JS/JSX Dateien nutzen soll
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  // Wichtig für CSS-Imports in deinen Komponenten
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
 setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};