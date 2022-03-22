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
    nav("/colorfinder");
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
        <Describe>
          <RankNumber>순위</RankNumber>
          <Nickname>닉네임</Nickname>
          <Score_>점수</Score_>
          <Stage>스테이지</Stage>
        </Describe>
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
      </RankingView>

      <Restart>
        <ReStartButton onClick={goBack}>다시하기</ReStartButton>
      </Restart>
    </RankPageView>
  );
};
const RankPageView = styled.div`
  margin-top: 5px;
`;
const RankingView = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;

  border: 1px solid gray;
`;
const UserRank = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 10px;
  border-bottom: 0.5px solid gray;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${(props) => (props.idx % 2 == 1 ? "#eceeef" : "#f9f9fa")};
`;
const Describe = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 7px;
  font-weight: 600;
  border-bottom: 0.5px solid gray;
  background-color: lightgoldenrodyellow;
`;
const RankNumber = styled.span``;
const Nickname = styled.span``;
const Score_ = styled.span`
  padding-left: 20px;
`;
const Score = styled.span``;

const Stage = styled.span``;
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
