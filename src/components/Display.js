import { Textfit } from "react-textfit";
import "./Display.css";

const Display = ({ value }) => {
  return (
    <Textfit className="display" mode="Single" max={50}>
      {value}
    </Textfit>
  );
};

export default Display;
