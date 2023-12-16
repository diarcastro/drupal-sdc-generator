import _deburr from 'lodash/deburr';
import _snakeCase from 'lodash/snakeCase';
import _kebabCase from 'lodash/kebabCase';
import _lowerCase from 'lodash/lowerCase';
import _startCase from 'lodash/startCase';
import _camelCase from 'lodash/camelCase';

export class StringHelper {
  text: string;

  constructor(text: string | null) {
    this.text = text || '';
  }

  /**
   * String in snake case
   */
  get machineName() {
    return this.snakeCase;
  }

  /**
   * Sanitize string to snake case
   */
  get snakeCase() {
    return StringHelper.toSnakeCase(this.text);
  }

  /**
   * Sanitize string to title case
   */
  get titleCase() {
    return StringHelper.toTitleCase(this.text);
  }

  /**
   * Sanitize string to filename case
   */
  get filename() {
    return StringHelper.toKebabCase(this.text);
  }

  /**
   * Sanitize string to filename case
   */
  get camelCase() {
    return StringHelper.toCamelCase(this.text);
  }

  static toSnakeCase(str: string) {
    if (!str) {
      return '';
    }

    return _snakeCase(_deburr(str));
  }

  static toKebabCase(str: string) {
    if (!str) {
      return '';
    }

    return _kebabCase(_deburr(str));
  }

  static toTitleCase(str: string) {
    if (!str) {
      return '';
    }

    return _startCase(_lowerCase(str));
  }

  static toCamelCase(str: string) {
    if (!str) {
      return '';
    }

    return _camelCase(_deburr(str));
  }
}
