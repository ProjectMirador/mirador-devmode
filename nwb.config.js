const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MiradorDevmode',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    aliases: {
      // needs shared global state for context to work
      'react-dnd': path.resolve(path.join(__dirname, 'node_modules', 'react-dnd')),
    },
  },
}
