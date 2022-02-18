import { useState } from "react";

export default function useApplicationData() {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // number to human readable string
  const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
  // human readable string to number
  const removeSpaces = (num) => num.toString().replace(/\s/g, "");

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

  return {
    calc,
    numberClickHandler,
    decimalClickHandler,
    signClickHandler,
    equalsClickHandler,
    invertClickHandler,
    percentClickHandler,
    resetClickHandler,
  };
}
