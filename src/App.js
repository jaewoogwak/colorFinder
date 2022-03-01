import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Box from "./components/Box";

let STAGE_NUM = 1; // 2 ~ 8
let STAGE_MAX = 9;
function App() {
  const [isRunning, setIsRunning] = useState(true);
  const [stage, setStage] = useState(1);
  const [size, setSize] = useState(2);
  const [stage_list, setStage_list] = useState([]);
  const [other, setOther] = useState();
  const [color, setColor] = useState();
  const [randColor, setRandColor] = useState();
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(stage + 5);
  const timeCount = useRef(stage + 5);
  const [tCount, setTCount] = useState(timeCount.current);
  const init = () => {
    console.log("init");
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

      setScore((prev) => prev + stage * 2);
      if (STAGE_NUM <= STAGE_MAX) {
        setSize(STAGE_NUM);
      }
      setStage(STAGE_NUM);
      timeCount.current += 3;
      console.log("update sec!");
    } else {
      console.log("남은 시간 감소 및 스코어 감소");
      // 스코어 감소
      setScore((prev) => {
        {
          if (prev - stage / 2 < 0) {
            return 0;
          }
          console.log("score down");
          return prev - stage;
        }
      });
      // 남은 시간 감소
      timeCount.current -= 3;
    }
  };

  const gameOver = () => {
    // alert("GAME OVER!!!!");
    console.log("game over!!!!");
    getGameInfo();
    setIsRunning(false);
  };
  const getGameInfo = () => {
    // alert(`stage : ${stage} score : ${score}`);
  };
  useEffect(() => {
    console.log(isRunning);
    init(stage);
    const timerId = setInterval(() => {
      timeCount.current = timeCount.current - 1;
      setTCount((prev) => prev - 1);
      console.log("time in useEffect", timeCount, tCount);
      if (timeCount.current <= 0 && isRunning == true) {
        console.log("game over");
        clearInterval(timerId);
        setIsRunning(false);
      }
    }, 1000);
    console.log("hoello");

    return () => clearInterval(timerId);
  }, [stage]);
  return (
    <div>
      {isRunning == true ? (
        <>
          <InfoBar stage={stage}>
            <span> stage : {stage}</span>
            <span> score : {score}</span>
            <span> time2 : {timeCount.current}</span>
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
        </>
      ) : (
        <>
          <h1>game over!</h1>
          <h2>maximum stage : {stage}</h2>
          <h2>your score :{score}</h2>
        </>
      )}
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

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
`;

export default App;
