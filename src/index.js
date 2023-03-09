const memoize = require('lodash.memoize');
const Mermaid = require('mermaid');

const defaultOptions = {
  mermaid: {},
  container: undefined,
  callback: undefined
};
const isBrowser = global.document !== undefined && global.window !== undefined;

export default function markedMermaid(options = {}) {
  let initialized = false;

  // Make sure we have access to the document and window object (client-side rendering)
  if (isBrowser) {
    // Initialize Mermaid, but do not automatically start
    Mermaid.initialize({
      ...options.mermaid,
      startOnLoad: false
    });

    initialized = true;
  }

  // We memoize mermaid.render here to optimize performance
  const renderMermaid = memoize((code, container = undefined, callback = undefined) => {
    const id = Math.floor(Math.random() * 100);
    try {
      return `<pre id="mermaid-${id}" class="mermaid" data-processed="true">
      ${Mermaid.render(`mermaid-${id}`, code, callback ?? (() => { }), container)}
      </pre>`;
    } catch (ex) {
      return `<pre><code>${ex}</code></pre>`;
    }
  });

  options = {
    ...defaultOptions,
    ...options
  };

  return {
    extensions: [{
      name: 'code', // Needs to be "code" to be able to override the default code block renderer
      level: 'block',
      renderer({ lang, text }) {
        if (lang !== 'mermaid') return false; // Continue with default renderer if it's not a mermaid code block

        // Define HTML content in case of server-side rendering
        let htmlContent = `<pre class="mermaid">${text}</pre>`;
        if (!initialized) {
          htmlContent += `<script type="module">
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@9/dist/mermaid.esm.min.mjs';
            mermaid.initialize(${JSON.stringify({ startOnLoad: true, ...options.mermaid })});
          </script>`;

          initialized = true;
        }

        return isBrowser
          ? renderMermaid(text, options.container, options.callback)
          : htmlContent;
      }
    }]
  };
}
