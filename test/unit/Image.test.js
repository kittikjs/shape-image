import { assert } from 'chai';
import { Cursor } from 'kittik-cursor';
import sinon from 'sinon';
import Image from '../../src/Image';

describe('Shape::Image', () => {
  it('Should properly get/set image', () => {
    let image = new Image();

    assert.notOk(image.getImage());
    assert.instanceOf(image.setImage('dGVzdA=='), Image);
    assert.equal(image.getImage(), 'dGVzdA==');

    assert.instanceOf(image.setImage('./examples/nodejs.png'), Image);
    assert.ok(Image.isBase64(image.getImage()));
  });

  it('Should properly get/set width', () => {
    let image = new Image();

    assert.equal(image.getWidth(), 'auto');
    assert.instanceOf(image.setWidth('100px'), Image);
    assert.equal(image.getWidth(), '100px');
  });

  it('Should properly get/set height', () => {
    let image = new Image();

    assert.equal(image.getHeight(), 'auto');
    assert.instanceOf(image.setHeight('100px'), Image);
    assert.equal(image.getHeight(), '100px');
  });

  it('Should properly get/set preserveAspectRatio', () => {
    let image = new Image();

    assert.ok(image.isPreserveAspectRatio());
    assert.instanceOf(image.setPreserveAspectRatio(false), Image);
    assert.notOk(image.isPreserveAspectRatio());
  });

  it('Should properly render the shape', () => {
    let cursor = new Cursor();
    let mock = sinon.mock(cursor);
    let image = new Image({image: 'dGVzdA=='});

    mock.expects('moveTo').once().withArgs(10, 10).returns(cursor);
    mock.expects('image').once().withArgs({
      image: 'dGVzdA==',
      width: 'auto',
      height: 'auto',
      preserveAspectRatio: true
    }).returns(cursor);

    image.render(cursor);

    mock.verify();
  });

  it('Should properly serialize shape to object', () => {
    let image = new Image({image: 'dGVzdA=='});
    let obj = image.toObject();

    assert.deepEqual(obj, {
      type: 'Image',
      options: {
        text: '',
        width: 'auto',
        height: 'auto',
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
    let obj = {
      type: 'Image',
      options: {
        x: 20,
        y: 20,
        image: 'dGVzdA=='
      }
    };

    let image = Image.fromObject(obj);
    assert.instanceOf(image, Image);
    assert.equal(image.getText(), '');
    assert.equal(image.getWidth(), 'auto');
    assert.equal(image.getHeight(), 'auto');
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
