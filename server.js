import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "nalla_rahul"; 
const DOB = "05012005";  
const EMAIL = "nallarahul515@gmail.com";
const ROLL_NUMBER = "22BCE7708";

function alternatingCapsReverse(str) {
  let reversed = str.split("").reverse();
  return reversed
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const inputData = req.body.data || [];

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;
    let alphaConcat = "";

    inputData.forEach((item) => {
      if (!isNaN(item) && item.trim() !== "") {
        const num = parseInt(item, 10);
        if (!isNaN(num)) {
          sum += num;
          if (num % 2 === 0) {
            evenNumbers.push(item.toString());
          } else {
            oddNumbers.push(item.toString());
          }
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphaConcat += item;
      } else {
        specialChars.push(item);
      }
    });

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(alphaConcat),
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("API is running. Use POST /bfhl");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

