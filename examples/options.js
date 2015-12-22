"use strict";

const fs = require('fs');
const cursor = require('kittik-cursor').Cursor.create().resetTTY();
const shape = require('../lib/Image').default.create({
  image: './examples/nodejs.png',
  width: '100px',
  height: '40px',
  preserveAspectRatio: false,
  x: 40,
  y: 5
});

shape.render(cursor);

cursor.flush();
