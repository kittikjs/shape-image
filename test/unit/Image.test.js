import { assert } from 'chai';
import Cursor from 'kittik-cursor';
import sinon from 'sinon';
import Image from '../../src/Image';

describe('Shape::Image', () => {
  it('Should properly get/set image', () => {
    const image = new Image();

    assert.notOk(image.getImage());
    assert.instanceOf(image.setImage('dGVzdA=='), Image);
    assert.equal(image.getImage(), 'dGVzdA==');

    assert.instanceOf(image.setImage('./examples/nodejs.png'), Image);
    assert.ok(Image.isBase64(image.getImage()));
  });

  it('Should properly get/set preserveAspectRatio', () => {
    const image = new Image();

    assert.ok(image.isPreserveAspectRatio());
    assert.instanceOf(image.setPreserveAspectRatio(false), Image);
    assert.notOk(image.isPreserveAspectRatio());
  });

  it('Should properly render the shape', () => {
    const cursor = new Cursor();
    const mock = sinon.mock(cursor);
    const image = new Image({image: 'dGVzdA=='});

    mock.expects('moveTo').once().withArgs(10, 10).returns(cursor);
    mock.expects('image').once().withArgs({
      image: 'dGVzdA==',
      width: 15,
      height: 5,
      preserveAspectRatio: true
    }).returns(cursor);

    image.render(cursor);

    mock.verify();
  });

  it('Should properly serialize shape to object', () => {
    const image = new Image({image: 'dGVzdA=='});
    const obj = image.toObject();

    assert.deepEqual(obj, {
      type: 'Image',
      options: {
        text: '',
        width: 15,
        height: 5,
        x: 10,
        y: 10,
        background: undefined,
        foreground: undefined,
        image: 'dGVzdA==',
        preserveAspectRatio: true
      }
    });
  });

  it('Should properly create Image from object', () => {
    const obj = {
      type: 'Image',
      options: {
        x: 20,
        y: 20,
        image: 'dGVzdA=='
      }
    };

    const image = Image.fromObject(obj);
    assert.instanceOf(image, Image);
    assert.equal(image.getText(), '');
    assert.equal(image.getWidth(), 15);
    assert.equal(image.getHeight(), 5);
    assert.equal(image.getX(), 20);
    assert.equal(image.getY(), 20);
    assert.isUndefined(image.getBackground());
    assert.isUndefined(image.getForeground());
    assert.equal(image.getImage(), 'dGVzdA==');
    assert.ok(image.isPreserveAspectRatio());
  });

  it('Should properly check if string isBase64', () => {
    assert.ok(Image.isBase64('dGVzdA=='));
    assert.notOk(Image.isBase64('not base64'));
  });
});
