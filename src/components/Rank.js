import { Link, useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
// import { useStore } from "./Home";

const db = getFirestore();

const Rank = () => {
  const [userRank, setUserRank] = useState([]);
  const [TopRank, setTopRank] = useState([]);
  // const { onClickRestart } = useStore();
  const goBack = () => {
    // onClickRestart();
  };
  const readData = async () => {
    let tmpAry = [];
    console.log("readdata");
    const querySnapshot = await getDocs(collection(db, "rank"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
      tmpAry.push({
        id: doc.id,
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
      <Title>Ranking page</Title>
      <RankingView>
        {userRank.length >= 10
          ? TopRank.map((rank, idx) => (
              <UserRank key={rank.id}>
                {`${idx + 1}. id : ${rank.id} score : ${rank.score} stage : ${
                  rank.stage
                }`}
              </UserRank>
            ))
          : userRank.map((rank, idx) => (
              <UserRank key={rank.id}>
                {`${idx + 1}. id : ${rank.id} score : ${rank.score} stage : ${
                  rank.stage
                }`}
              </UserRank>
            ))}
      </RankingView>
      <Link to="/">Restart</Link>
      <Restart>
        <ReStartButton onClick={goBack}>Restart</ReStartButton>
      </Restart>
    </RankPageView>
  );
};
const RankPageView = styled.div`
  margin-top: 30px;
`;
const RankingView = styled.div`
  margin: 0 auto;
  margin-top: 50px;
`;
const Title = styled.div`
  text-align: center;
  font-size: 52px;
  font-weight: 600;
`;
const Restart = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 10px;
  text-align: center;
`;
const ReStartButton = styled.button`
  background-color: aqua;
  text-align: center;
  margin: 0 auto;
  width: 140px;
  height: 30px;
  font-size: 22px;
  cursor: pointer;
`;
const UserRank = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 15px;
`;
export default Rank;
