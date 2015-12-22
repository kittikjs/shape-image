"use strict";

const cursor = require('kittik-cursor').Cursor.create().resetTTY();
const shape = require('../lib/Image').default.create({image: './examples/nodejs.png'});

shape.render(cursor);

cursor.flush();
