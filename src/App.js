import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { easy, hard, medium } from "./Color";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Rank from "./components/Rank";
import { app, db } from "./fb";
import { collection, addDoc } from "firebase/firestore";
import Nickname from "./components/Nickname";
let STAGE_NUM = 1;
let STAGE_MAX = 13;

const App = () => {
  console.log("app", app);

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
  const [username, setUsername] = useState();

  const onClickReStart = () => {
    console.log("onclickrestart");
    setSize(2);
    setStage(1);
    setScore(0);
    STAGE_NUM = 1;
    setIsRunning((prev) => !prev);
    init();
    timeCount.current = 6;
  };
  const init = () => {
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
    // easy mode
    if (stage < 7) colorSet = easy;
    // medium mode
    else if (7 <= stage && stage < 13) colorSet = medium;
    // hard mode
    else colorSet = hard;
    const num = Math.floor(Math.random() * colorSet.length);
    const color1 = colorSet[num].color;
    const rColor1 = colorSet[num].rColor;
    setColor(color1);
    setRandColor(rColor1);
  };

  const onClicked = (e) => {
    if (e.target.id == other) {
      STAGE_NUM += 1;
      setScore((prev) => prev + stage * 2);
      if (STAGE_NUM <= STAGE_MAX) setSize(STAGE_NUM);
      setStage(STAGE_NUM);
      timeCount.current += 3;
    } else {
      console.log("남은 시간 감소");
      let decrease = 0;
      // easy mode
      if (stage < 7) decrease = 2;
      // medium mode
      else if (7 <= stage && stage < 13) decrease = 3;
      // hard mode
      else decrease = 4;

      console.log("decrease", decrease);
      timeCount.current -= decrease;
    }
  };

  const submitGameInfo = async () => {
    console.log("submit game info");
    const name = username;
    const userScore = score;
    const userStage = stage;
    console.log(
      `user game info => username : ${name} score : ${score} stage : ${stage}`
    );
    try {
      const docRef = await addDoc(collection(db, "rank"), {
        username: name,
        score: userScore,
        stage: userStage,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const getUserName = () => {
    const name = localStorage.getItem("name");
    if (name != null && name != undefined) {
      setUsername(name);
      return name;
    } else {
      return false;
    }
  };
  useEffect(() => {
    const name = getUserName();
    if (name != false) {
      console.log("username", username);
      init();
      const timerId = setInterval(() => {
        timeCount.current = timeCount.current - 1;
        setTCount((prev) => prev - 1);
        console.log("time in useEffect", timeCount);
        if (timeCount.current <= 0) {
          console.log("game over");
          setIsRunning(false);
          clearInterval(timerId);
          submitGameInfo();
        }
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      console.log("not yet user name input");
      getUserName();
    }
  }, [username, stage, isRunning]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Nickname getUserName={getUserName} />} />
        <Route
          path="/colorfinder"
          element={
            <Home
              stage={stage}
              score={score}
              isRunning={isRunning}
              timeCount={timeCount}
              size={size}
              stage_list={stage_list}
              other={other}
              randColor={randColor}
              color={color}
              onClicked={onClicked}
              onClickReStart={onClickReStart}
            />
          }
        />
        <Route
          path="/rank"
          element={<Rank onClickReStart={onClickReStart} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
