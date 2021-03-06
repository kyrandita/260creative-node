const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('public'));
const elements = [
  'air',
  'boiler',
  'cloud',
  'earth',
  'energy',
  'fire',
  'lava',
  'metal',
  'steam',
  'stone',
  'water',
];
const combinations = {
  'air' : {
    'fire' : 'energy',
    'lava' : 'stone',
    'steam' : 'cloud',
  },
  'earth' : {
    'fire' : 'lava',
  },
  'fire' : {
    'water' : 'steam',
    'stone' : 'metal',
  },
  'metal' : {
    'steam' : 'boiler',
  },
};
const highScores = [];

app.get('/combine', (req, res) => {
  const el1 = req.query.el1;
  const el2 = req.query.el2;
  const newEl = Object.keys(combinations).reduce((carry, level1) => {
    if (!carry && (el1 === level1 || el2 === level1)) {
      carry = Object.keys(combinations[level1]).reduce((inner, level2) => {
        if (!inner && (el1 === level2 || el2 === level2)) {
          return combinations[level1][level2];
        }
        return inner;
      }, undefined);
    }
    return carry;
  }, undefined);
  if (!newEl) {
    res.status(404).send('does not combine');
  } else {
    res.send(newEl);
  }
});

app.get('/winCheck', (req, res) => {
  const userElements = req.query.elements;
  if (userElements.sort().join('') === elements.sort().join('')) {
    res.send(true);
  } else {
    res.status(400).send(false);
  }
});

app.get('/win', (req, res) => {
  const userElements = req.query.elements;
  const userName = req.query.name;
  const time = req.query.time;
  if (userElements.sort().join('') === elements.sort().join('')) {
    highScores.push({name: userName, time});
    res.send(true);
  } else {
    res.status(400).send(false);
  }
});

app.get('/scores', (req, res) => {
  res.send(highScores);
})

app.listen(8082);
