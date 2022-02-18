import React from "react";
import Body from "./components/Body";
import Display from "./components/Display";
import ButtonContainer from "./components/ButtonContainer";
import Button from "./components/Button";
import useApplicationData from "./hooks/useApplicationData";
import "./App.css";

function App() {
  const {
    calc,
    numberClickHandler,
    decimalClickHandler,
    signClickHandler,
    equalsClickHandler,
    invertClickHandler,
    percentClickHandler,
    resetClickHandler,
  } = useApplicationData();

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
