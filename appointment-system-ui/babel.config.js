module.exports = {
  presets: [
    '@babel/preset-env', // Modern JavaScript için gerekli ön ayar
    '@babel/preset-react' // React için gerekli ön ayar
  ],
  plugins: [
    '@babel/plugin-transform-private-property-in-object', // Özel mülkiyet desteği için gerekli eklenti
  ],
};
