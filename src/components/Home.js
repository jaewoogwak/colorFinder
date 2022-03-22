import styled from "styled-components";
import Box from "./Box";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../fb";

import { Link } from "react-router-dom";

const Home = ({
  stage,
  score,
  isRunning,
  timeCount,
  size,
  stage_list,
  other,
  randColor,
  color,
  onClicked,
  onClickReStart,
}) => {
  return (
    <div>
      {isRunning === true ? (
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
          <RankPage>
            <Link to="/rank">
              {">"} Top Rank {"<"}
            </Link>
          </RankPage>
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
