"use strict";

const fs = require('fs');
const cursor = require('kittik-cursor').create().resetTTY();
const shape = require('../lib/Image').create({image: fs.readFileSync('./examples/nodejs.png', 'base64')});

shape.render(cursor);

cursor.flush();
