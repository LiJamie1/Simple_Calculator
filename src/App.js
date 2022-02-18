import React, { useState } from "react";
import "./App.css";
import Body from "./components/Body";
import Display from "./components/Display";
import ButtonContainer from "./components/ButtonContainer";
import Button from "./components/Button";

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    const num =
      calc.num === 0 && value === "0"
        ? "0"
        : calc.num % 1 === 0
        ? Number(calc.num + value)
        : calc.num + value;
    const res = !calc.sign ? 0 : calc.res;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({ ...calc, num, res: res });
    }
  };

  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    const num = !calc.num.toString().includes(".")
      ? calc.num + value
      : calc.num;

    setCalc({ ...calc, num });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const sign = e.target.innerHTML;
    const res = !calc.res && calc.num ? calc.num : calc.res;

    setCalc({ ...calc, sign, num: 0, res });
  };

  const equalsClickHandler = (e) => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "/"
          ? a / b
          : a * b;

      const res =
        calc.num === "0" && calc.sign === "/"
          ? "Can't divide by zero"
          : math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            );

      setCalc({ ...calc, res, sign: "", num: 0 });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const buttonValues = [
    ["C", "+/-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const buttonsArray = buttonValues.flat().map((btn, i) => {
    return (
      <Button
        key={i}
        className={btn === "=" ? "equals" : ""}
        value={btn}
        onClick={
          btn === "C"
            ? resetClickHandler
            : btn === "+-"
            ? invertClickHandler
            : btn === "%"
            ? percentClickHandler
            : btn === "="
            ? equalsClickHandler
            : btn === "/" || btn === "X" || btn === "-" || btn === "+"
            ? signClickHandler
            : btn === "."
            ? decimalClickHandler
            : numberClickHandler
        }
      />
    );
  });

  return (
    <Body>
      <Display value={calc.num ? calc.num : calc.res} />
      <ButtonContainer>{buttonsArray}</ButtonContainer>
    </Body>
  );
}

export default App;
