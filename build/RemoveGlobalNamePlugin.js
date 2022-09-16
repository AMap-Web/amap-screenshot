import MagicString from 'magic-string'

export default function RemoveGlobalNamePlugin () {
  return {
    name: 'remove-global-name-plugin', // this name will show up in warnings and errors
    renderChunk ( code , chunk) {
      const id = chunk.fileName;
      const magicString = new MagicString(code);
      if (!codeHasReplacements(code, id, magicString)) {
        return null;
      }

      const result = { code: magicString.toString() };
      result.map = magicString.generateMap({ hires: true });
      return result;
    }
  };
  function codeHasReplacements(code, id, magicString) {
    const pattern = /global.AMap\s=\s\{\}/
    let result = false;
    let match;

    // eslint-disable-next-line no-cond-assign
    if ((match = pattern.exec(code))) {
      result = true;
      const start = match.index;
      const end = start + match[0].length;
      const replacement = 'global.AMap = global.AMap || {}';
      magicString.overwrite(start, end, replacement);
    }
    return result;
  }
}
