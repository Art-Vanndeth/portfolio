import { SlugifyOptions, CharMap } from './types';
import { charMap, locales } from './data';

function slugify(input: string, options?: SlugifyOptions | string): string {
  if (typeof input !== 'string') {
    throw new Error('slugify: string argument expected');
  }

  const opts: SlugifyOptions = typeof options === 'string'
    ? { replacement: options }
    : options || {};

  const locale = locales[opts.locale || ''] || {};
  const replacement = opts.replacement ?? '-';
  const trim = opts.trim ?? true;

  // Normalize the input string
  let slug = Array.from(input.normalize('NFKD'))
    .reduce((result, char) => {
      let mappedChar = locale[char] ?? charMap[char] ?? char;
      if (mappedChar === replacement) mappedChar = ' ';
      return result + mappedChar;
    }, '')
    .replace(opts.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, ''); // Remove unwanted characters

  if (opts.strict) {
    slug = slug.replace(/[^A-Za-z0-9\s]/g, ''); // Strict mode: allow only alphanumeric and spaces
  }

  if (trim) {
    slug = slug.trim(); // Trim leading and trailing spaces
  }

  // Replace spaces with the replacement character, collapsing multiple spaces
  slug = slug.replace(/\s+/g, replacement);

  if (opts.lower) {
    slug = slug.toLowerCase(); // Convert to lowercase if required
  }

  return slug;
}

namespace slugify {
  export function extend(customMap: CharMap): void {
    Object.assign(charMap, customMap);
  }
}

export default slugify;