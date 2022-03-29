import { Link, useNavigate, useParams } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
// import { useStore } from "./Home";

const db = getFirestore();

const Rank = ({ onClickReStart }) => {
  const [userRank, setUserRank] = useState([]);
  const [TopRank, setTopRank] = useState([]);
  const nav = useNavigate();
  const goBack = () => {
    console.log("goback");
    onClickReStart();
    nav("/home");
  };
  const readData = async () => {
    let tmpAry = [];
    console.log("readdata");
    const querySnapshot = await getDocs(collection(db, "rank"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
      tmpAry.push({
        id: doc.id,
        username: doc.data().username,
        score: doc.data().score,
        stage: doc.data().stage,
      });
    });
    const sortedRankAry = tmpAry.sort((a, b) => b.score - a.score);
    setUserRank(sortedRankAry);
    let topUsers = [];
    if (tmpAry.length >= 10) {
      for (let i = 0; i < 10; i++) {
        topUsers.push(sortedRankAry[i]);
      }
    }

    setTopRank(topUsers);
  };

  useEffect(() => {
    readData();
  }, []);
  console.log("userrank", userRank);
  console.log("topRank", TopRank);
  return (
    <RankPageView>
      <Title>랭킹</Title>
      <RankingView>
        {/* <thead>
          <Test>
            <RankNumber_>순위</RankNumber_>
            <Nickname_>닉네임</Nickname_>
            <Score_>점수</Score_>
            <Stage_>스테이지</Stage_>
          </Test>
        </thead>
        <tbody>
          <Test>
            <RankNumber>1</RankNumber>
            <Nickname>재우</Nickname>
            <Score>12321</Score>
            <Stage>20020202</Stage>
          </Test>
          <Test>
            <RankNumber>1재우 재우</RankNumber>
            <td>재우</td>
            <td>10</td>
            <td>5</td>
          </Test>
        </tbody> */}
        <thead>
          <Describe>
            <RankNumber_>순위</RankNumber_>
            <Nickname_>닉네임</Nickname_>
            <Score_>점수</Score_>
            <Stage_>스테이지</Stage_>
          </Describe>
        </thead>
        <tbody>
          {userRank.length >= 10
            ? TopRank.map((rank, idx) => (
                <UserRank key={rank.id} idx={idx + 1}>
                  <RankNumber>{idx + 1}</RankNumber>
                  <Nickname>{rank.username}</Nickname>
                  <Score>{rank.score}</Score>
                  <Stage>{rank.stage}</Stage>
                </UserRank>
              ))
            : userRank.map((rank, idx) => (
                <UserRank key={rank.id} idx={idx + 1}>
                  <RankNumber>{idx + 1}</RankNumber>
                  <Nickname>{rank.username}</Nickname>
                  <Score>{rank.score}</Score>
                  <Stage>{rank.stage}</Stage>
                </UserRank>
              ))}
        </tbody>
      </RankingView>

      <Restart>
        <ReStartButton onClick={goBack}>다시하기</ReStartButton>
      </Restart>
    </RankPageView>
  );
};
const Test = styled.tr`
  text-align: center;
`;

const RankPageView = styled.div`
  margin-top: 5px;
`;
const RankingView = styled.table`
  margin: 0 auto;
  margin-top: 10px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;

  border: 1px solid gray;
`;
const Describe = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 7px;
  font-weight: 600;
  border-bottom: 0.5px solid gray;
  background-color: lightgoldenrodyellow;
`;
const UserRank = styled.tr`
  /* text-align: center; */
  font-size: 20px;
  padding-top: 5px;
  border-bottom: 0.5px solid gray;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: ${(props) => (props.idx % 2 == 1 ? "#eceeef" : "#f9f9fa")};
`;

const RankNumber = styled.td`
  width: 300px;
`;
const RankNumber_ = styled.th`
  width: 300px;
`;
const Nickname = styled.td`
  width: 500px;
`;
const Nickname_ = styled.th`
  width: 500px;
`;
const Score = styled.td`
  width: 300px;
`;
const Score_ = styled.th`
  width: 300px;
`;
const Stage = styled.td`
  width: 300px;
`;
const Stage_ = styled.th`
  width: 300px;
`;
const Title = styled.div`
  text-align: center;
  font-size: 48px;
  font-weight: 600;
`;
const Restart = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
`;
const ReStartButton = styled.button`
  background-color: #d2202f;
  text-align: center;
  margin: 0 auto;
  width: 160px;
  height: 48px;
  font-size: 22px;
  color: white;
  cursor: pointer;
`;

export default Rank;
