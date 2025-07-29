const express = require('express');

const app = express();
app.use(express.json());

const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL = "ABCD123";

function isNumber(value) {
  return !isNaN(value) && value.trim() !== '';
}

function isAlphabet(value) {
  return /^[A-Za-z]+$/.test(value);
}

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data || [];

    let odd = [], even = [], alphabets = [], special = [], sum = 0, alphaConcat = "";

    data.forEach(item => {
      if (isNumber(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) even.push(item);
        else odd.push(item);
        sum += num;
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        alphaConcat = item + alphaConcat;
      } else {
        special.push(item);
      }
    });

    let concatAlt = alphaConcat.split('')
      .map((ch, idx) => idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())
      .join('');

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: special,
      sum: sum.toString(),
      concat_string: concatAlt
    });
  } catch {
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

module.exports = app;