import Shape from 'kittik-shape-basic';
import path from 'path';
import fs from 'fs';

/**
 * Implements support for Image drawing in terminal.
 *
 * @since 1.0.0
 */
export default class Image extends Shape {
  /**
   * Creates new Image instance.
   *
   * @param {Cursor} cursor Cursor instance
   * @param {Object} [options]
   * @param {String} [options.image] Base64 encoded file or path to image
   * @param {Boolean} [options.preserveAspectRatio] If true, preserve aspect ratio
   */
  constructor(cursor, options = {}) {
    super(cursor, options);

    this.setImage(options.image);
    this.setPreserveAspectRatio(options.preserveAspectRatio);
  }

  /**
   * Get base64 encoded image.
   *
   * @returns {String}
   */
  getImage() {
    return this.get('image');
  }

  /**
   * Set image to the shape.
   *
   * @param {String} image Can be path to the image or base64 encoded image
   * @returns {Shape}
   */
  setImage(image) {
    if (!image) return this;
    if (Image.isBase64(image)) return this.set('image', image);

    return this.set('image', fs.readFileSync(path.resolve(image), 'base64'));
  }

  /**
   * Check if image is preserve aspect ratio.
   *
   * @returns {Boolean}
   */
  isPreserveAspectRatio() {
    return !!this.get('preserveAspectRatio');
  }

  /**
   * Set preserve aspect ratio.
   *
   * @param {Boolean} [isPreserveAspectRatio=true] If false, not preserves aspect ratio in the image
   * @returns {Shape}
   */
  setPreserveAspectRatio(isPreserveAspectRatio = true) {
    return this.set('preserveAspectRatio', isPreserveAspectRatio);
  }

  /**
   * Renders the shape.
   *
   * @returns {Image}
   */
  render() {
    const cursor = this.getCursor();
    const width = this.getWidth();
    const height = this.getHeight();
    const x = this.getX();
    const y = this.getY();
    const image = this.getImage();
    const preserveAspectRatio = this.isPreserveAspectRatio();
    const args = `width=${width};height=${height};preserveAspectRatio=${preserveAspectRatio ? 1 : 0};inline=1`;

    cursor._stream.write(`\u001b[${y + 1};${x + 1}H\u001b]1337;File=${args}:${image}^G`);

    return this;
  }

  /**
   * Serializes shape to the object representation.
   *
   * @returns {{name, options}|*}
   */
  toObject() {
    const obj = super.toObject();

    Object.assign(obj.options, {
      image: this.get('image'),
      preserveAspectRatio: this.get('preserveAspectRatio')
    });

    return obj;
  }

  /**
   * Check if string is base64 encoded string.
   *
   * @param {String} string
   * @returns {Boolean}
   */
  static isBase64(string) {
    return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(string);
  }
}
