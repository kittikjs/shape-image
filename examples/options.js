"use strict";

const fs = require('fs');
const cursor = require('kittik-cursor').Cursor.create().resetTTY();
const shape = require('../lib/Image').default.create({
  image: './examples/nodejs.png',
  x: 'center',
  y: 'middle',
  width: '40%',
  height: '20%',
  preserveAspectRatio: true
});

shape.render(cursor);

cursor.flush();
