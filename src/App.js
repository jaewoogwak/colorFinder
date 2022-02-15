import { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "./components/Box";

let STAGE_NUM = 2; // 2 ~ 8
let STAGE_MAX = 9;
function App() {
  const [stage, setStage] = useState(2);
  const [size, setSize] = useState(2);
  const [stage_list, setStage_list] = useState([]);
  const [other, setOther] = useState();
  const [color, setColor] = useState();
  const [randColor, setRandColor] = useState();
  const [score, setScore] = useState(0);

  const init = (stage) => {
    let arr = [];
    for (let i = 0; i < size * size; i++) {
      arr.push(i + 1);
    }
    setStage_list(arr);
    randomGen();
    getRandomColor();
  };

  const randomGen = () => {
    const num = Math.floor(Math.random() * size * size + 1);
    setOther(num);
  };

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    let rColor = "";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    for (let i = 0; i < color.length; i++) {
      if (isNaN(color[i]) == false) {
        rColor += (color[i] + 9) % 10;
      } else {
        rColor += color[i];
      }
    }
    setColor(color);
    setRandColor(rColor);
  };

  const onClicked = (e) => {
    if (e.target.id == other) {
      console.log("clicked!", e.target.id);
      STAGE_NUM += 1;
      setScore((prev) => prev + stage);
      if (STAGE_NUM <= STAGE_MAX) {
        setSize(STAGE_NUM);
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
      <InfoBar>
        stage : {stage}
        score : {score}
      </InfoBar>
      <View stage={stage} size={size}>
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
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  gap: 1px;
`;

const InfoBar = styled.div``;

export default App;
