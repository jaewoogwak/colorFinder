import { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "./components/Box";

function App() {
  const [stage, setStage] = useState(3);
  const [stage_list, setStage_list] = useState([]);

  const init = (stage) => {
    let arr = [];
    for (let i = 0; i < stage * stage; i++) {
      arr.push(i + 1);
    }
    setStage_list(arr);
  };

  useEffect(() => {
    console.log(stage);
    init(stage);
  }, []);
  return (
    <div>
      <View stage={stage}>
        {stage_list.map((st) => (
          <Box key={st}></Box>
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

export default App;
