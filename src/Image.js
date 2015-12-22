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
   * @param {Object} [options]
   * @param {String} [options.image] Base64 encoded file or path to image
   * @param {Number|String} [options.width] Image width
   * @param {Number|String} [options.height] Image height
   * @param {Boolean} [options.preserveAspectRatio] If true, preserve aspect ratio
   */
  constructor(options = {}) {
    super(options);

    this.setImage(options.image);
    this.setWidth(options.width);
    this.setHeight(options.height);
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
    if (typeof image === 'undefined') return this;
    if (Image.isBase64(image)) return this.set('image', image);
    return this.set('image', fs.readFileSync(path.resolve(image), 'base64'));
  }

  /**
   * Get image width.
   *
   * @returns {Number|String}
   */
  getWidth() {
    return this.get('width');
  }

  /**
   * Set new image width.
   *
   * @param {Number|String} [width='auto']
   * @returns {Shape}
   */
  setWidth(width = 'auto') {
    return this.set('width', width);
  }

  /**
   * Get image height.
   *
   * @returns {Number|String}
   */
  getHeight() {
    return this.get('height');
  }

  /**
   * Set new image height.
   *
   * @param {Number|String} [height='auto']
   * @returns {Shape}
   */
  setHeight(height = 'auto') {
    return this.set('height', height);
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
   * @param {Cursor} cursor
   */
  render(cursor) {
    const x = this.getX();
    const y = this.getY();
    const image = this.getImage();
    const width = this.getWidth();
    const height = this.getHeight();
    const isPreserveAspectRatio = this.isPreserveAspectRatio();

    cursor.moveTo(x, y).image({image, width, height, preserveAspectRatio: isPreserveAspectRatio});
  }

  /**
   * Serializes shape to the object representation.
   *
   * @returns {{name, options}|*}
   */
  toObject() {
    let obj = super.toObject();

    Object.assign(obj.options, {
      image: this.getImage(),
      width: this.getWidth(),
      height: this.getHeight(),
      preserveAspectRatio: this.isPreserveAspectRatio()
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
