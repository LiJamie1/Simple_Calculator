import "./App.css";
import Body from "./components/Body";
import Display from "./components/Display";
import ButtonContainer from "./components/ButtonContainer";
import Button from "./components/Button";

function App() {
  const buttonValues = [
    ["C", "+/-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];
  return (
    <Body>
      <Display value="0" />
      <ButtonContainer>
        {buttonValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={() => {
                console.log(`${btn} clicked!`);
              }}
            />
          );
        })}
      </ButtonContainer>
    </Body>
  );
}

export default App;
