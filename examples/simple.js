"use strict";

const cursor = require('kittik-cursor').create().resetTTY();
const shape = require('../lib/Image').create({image: './examples/nodejs.png'});

shape.render(cursor);

cursor.flush();
