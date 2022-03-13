import { useEffect, useRef, useState } from "react";
import { Link, Routes } from "react-router-dom";
import styled from "styled-components";
import Box from "./Box";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../fb";
import create from "zustand";
import { easy, hard, medium } from "../Color";

let STAGE_NUM = 1; // dd
let STAGE_MAX = 13;
// export const useStore = create((set) => ({
//   size: 2,
//   stage: 1,
//   score: 0,
//   isRunning: true,
//   setSize2: () => set((state) => ({ size: state })),
//   setStage2: () => set((state) => ({ stage: state })),
//   setScore2: () => set((state) => ({ score: state })),
//   setIsRunning2: () => set((state) => ({ isRunning: state })),
//   onClickReStart() {
//     this.setSize2();
//     this.setStage2();
//     this.setScore2();
//     STAGE_NUM = 1;
//     this.setIsRunning2();
//     // timeCount.current = 6;
//   },
// }));
const Home = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [stage, setStage] = useState(1);
  const [size, setSize] = useState(2);
  const [stage_list, setStage_list] = useState([]);
  const [other, setOther] = useState();
  const [color, setColor] = useState();
  const [randColor, setRandColor] = useState();
  const [score, setScore] = useState(0);
  let timeCount = useRef(stage + 5);
  const [tCount, setTCount] = useState(timeCount.current);
  // const { isRunning, setIsRunning2 } = useStore();
  // const { stage, setStage2 } = useStore();
  // const { size, setSize2 } = useStore();
  // const { score, setScore2 } = useStore();
  // const [time, setTime] = useState(stage + 5);
  //# let timeCount = useRef(stage + 5);
  // const { onClickReStart } = useStore();

  const onClickReStart = () => {
    setSize(2);
    setStage(1);
    setScore(0);
    STAGE_NUM = 1;
    setIsRunning((prev) => !prev);
    init();
    timeCount.current = 6;
  };
  const init = () => {
    console.log("init", size);
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
    // palette array
    let colorSet;
    if (stage < 7) {
      // easy mode
      colorSet = easy;
    } else if (7 <= stage && stage < 13) {
      // medium mode
      colorSet = medium;
    } else {
      // hard mode
      colorSet = hard;
    }

    const randomColorNum = Math.floor(Math.random() * colorSet.length);
    console.log("randNum :", randomColorNum);
    let color1 = colorSet[randomColorNum].color;
    let rColor1 = colorSet[randomColorNum].rColor;
    setColor(color1);
    setRandColor(rColor1);
  };

  const onClicked = (e) => {
    if (e.target.id == other) {
      console.log("clicked!", e.target.id);
      STAGE_NUM += 1;
      // const scr = score + stage * 2;
      // setScore2(scr);
      setScore((prev) => prev + stage * 2);
      if (STAGE_NUM <= STAGE_MAX) {
        console.log("set size", STAGE_NUM);
        setSize(STAGE_NUM);
        // setSize2(STAGE_NUM);
      }
      setStage(STAGE_NUM);
      // setStage2(STAGE_NUM);
      timeCount.current += 3;
      console.log("update sec!");
    } else {
      console.log("남은 시간 감소 및 스코어 감소");
      // 스코어 감소
      // setScore((prev) => {
      //   {
      //     if (prev - stage / 2 < 0) {
      //       return 0;
      //     }
      //     console.log("score down");
      //     return prev - stage;
      //   }
      // });
      // 남은 시간 감소
      timeCount.current -= 3;
    }
  };

  const submitGameInfo = async () => {
    console.log("submit game info");
    const userScore = score;
    const userStage = stage;
    console.log(`user game info => score : ${score} stage : ${stage}`);
    try {
      const docRef = await addDoc(collection(db, "rank"), {
        score: userScore,
        stage: userStage,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    console.log(isRunning);
    init();
    const timerId = setInterval(() => {
      timeCount.current = timeCount.current - 1;
      setTCount((prev) => prev - 1);
      console.log("time in useEffect", timeCount, tCount, isRunning, size);
      if (timeCount.current <= 0) {
        console.log("game over");
        setIsRunning(false);

        clearInterval(timerId);
        // submitGameInfo();
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [stage, isRunning]);
  return (
    <div>
      {isRunning == true ? (
        <>
          <GameView>
            <GameStatusBar stage={stage}>
              <Stage>{stage} stage</Stage>
              <Score>{score} score</Score>
              <Second sec={timeCount.current}>{timeCount.current}s</Second>
            </GameStatusBar>
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
          </GameView>
        </>
      ) : (
        <GameOverView>
          <GameOver>GAME OVER!!!</GameOver>
          <MaxStage>maximum stage : {stage}</MaxStage>
          <MaxScore>your score : {score}</MaxScore>
          <Restart>
            <ReStartButton onClick={onClickReStart}>Restart</ReStartButton>
          </Restart>
          {/* <RankPage>
            <Link to="/rank">
              {">"} Top Rank {"<"}
            </Link>
          </RankPage> */}
        </GameOverView>
      )}
    </div>
  );
};
const GameView = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
`;
const GameStatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  width: 400px;
  gap: 30px;
  margin: 0 auto;
`;
const Stage = styled.span`
  font-weight: 700;
  font-size: 32px;
`;
const Score = styled.span`
  font-weight: 700;
  font-size: 28px;
  text-align: center;
  padding-top: 5px;
`;
const Second = styled.span`
  font-weight: 700;
  font-size: 32px;
  color: ${(props) => (props.sec <= 3 ? "red" : "black")};
`;
const View = styled.div`
  display: grid;
  width: 400px;
  height: 400px;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  gap: 1px;
  margin: 0 auto;
`;
const GameOverView = styled.div`
  margin: 0 auto;
  margin-top: 100px;
`;
const GameOver = styled.h1`
  text-align: center;
  font-size: 54px;
  margin-bottom: 60px;
`;
const MaxStage = styled.h2`
  text-align: center;
  font-size: 28px;
`;
const MaxScore = styled.h2`
  text-align: center;
  font-size: 28px;
`;
const Restart = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 10px;
  text-align: center;
`;
const ReStartButton = styled.button`
  background-color: aqua;
  margin: 0 auto;
  text-align: center;
  width: 140px;
  height: 30px;
  font-size: 22px;
  cursor: pointer;
`;
const RankPage = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 160px;
  height: 30px;
  font-size: 22px;
`;

export default Home;
