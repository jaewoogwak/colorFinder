import { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "./components/Box";

let STAGE_NUM = 2; // 2 ~ 8

function App() {
  const [stage, setStage] = useState(2);
  const [stage_list, setStage_list] = useState([]);
  const [other, setOther] = useState();
  const init = (stage) => {
    let arr = [];
    for (let i = 0; i < stage * stage; i++) {
      arr.push(i + 1);
    }
    setStage_list(arr);
    randomGen();
  };

  const randomGen = () => {
    const num = Math.floor(Math.random() * stage + 1);
    setOther(num);
  };
  const onClicked = (e) => {
    if (e.target.id == other) {
      console.log("clicked!", e.target.id);
      if (STAGE_NUM < 8) {
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
  }, [stage, other]);
  return (
    <div>
      <View stage={stage}>
        {stage_list.map((st) => (
          <Box key={st} id={st} onClick={onClicked}></Box>
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
