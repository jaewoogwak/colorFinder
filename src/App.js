import { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "./components/Box";

let STAGE_NUM = 2; // 2 ~ 8
let STAGE_MAX = 8;
function App() {
  const [stage, setStage] = useState(2);
  const [stage_list, setStage_list] = useState([]);
  const [other, setOther] = useState();
  const [color, setColor] = useState();
  const [randColor, setRandColor] = useState();
  const init = (stage) => {
    let arr = [];
    for (let i = 0; i < stage * stage; i++) {
      arr.push(i + 1);
    }
    setStage_list(arr);
    randomGen();
    getRandomColor();
  };

  const randomGen = () => {
    const num = Math.floor(Math.random() * stage * stage + 1);
    setOther(num);
  };

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    var code = "";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
      if (i < 5) {
        code += letters[Math.floor(Math.random() * 16)];
      }
    }
    const baseColor = `#${code}9`;
    console.log(baseColor);
    setColor(baseColor);
    setRandColor(color);
  };
  const onClicked = (e) => {
    if (e.target.id == other) {
      console.log("clicked!", e.target.id);
      if (STAGE_NUM < STAGE_MAX) {
        STAGE_NUM += 1;
      }
      setStage(STAGE_NUM);
    } else {
      console.log("남은 시간 감소");
    }
  };

  useEffect(() => {
    console.log("now stage", stage);
    init(stage);
    console.log("other", other);
  }, [stage]);
  return (
    <div>
      <View stage={stage}>
        {stage_list.map((st) => (
          <Box
            key={st}
            id={st}
            randomNum={other}
            randomColor={randColor}
            color={color}
            onClick={onClicked}
          ></Box>
        ))}
      </View>
    </div>
  );
}

const View = styled.div`
  display: grid;
  width: 400px;
  height: 400px;
  grid-template-columns: repeat(${(props) => props.stage}, 1fr);
  gap: 1px;
`;

const InfoBar = styled.div``;

export default App;
