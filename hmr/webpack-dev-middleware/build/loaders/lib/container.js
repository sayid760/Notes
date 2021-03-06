const container = require('markdown-it-container');

module.exports = md => {
  md
    .use(...createContainer('demo', 'demo'))
    .use(...createContainer('api', 'api'))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens, idx) => (tokens[idx].nesting === 1
        ? '<div v-pre>\n'
        : '</div>\n'),
    });
};

function createContainer(klass, defaultTitle) {
  return [container, klass, {
    render(tokens, idx) {
      const token = tokens[idx];
      const info = token.info.trim().slice(klass.length).trim();
      if (token.nesting === 1) {
        return `<div class="${klass} custom-block"><p class="custom-block-title">${info || defaultTitle}</p>\n`;
      }
      return '</div>\n';
    },
  }];
}
