import { Link, useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import app from "../fb";
import { useEffect, useState } from "react";
import styled from "styled-components";

const db = getFirestore();

const Rank = () => {
  const [userRank, setUserRank] = useState([]);
  const [sortedRank, setSortedRank] = useState([]);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const addData = async () => {
    console.log("adddata!");
    try {
      const docRef = await addDoc(collection(db, "rank"), {
        score: 6,
        stage: 7,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
  };

  const sorting = () => {
    const sortedRankAry = userRank.sort((a, b) => b.score - a.score);
    console.log("sortedAry", sortedRankAry);
    setSortedRank(sortedRankAry);
  };
  useEffect(() => {
    readData();
    // sorting();
  }, []);
  console.log("userrank", userRank);
  return (
    <RankPageView>
      <Title>Ranking page</Title>
      <h2 style={{ textAlign: "center" }}>total rank</h2>
      <RankingView>
        {userRank.map((rank, idx) => (
          <UserRank key={rank.id}>
            {`${idx + 1}. id : ${rank.id} score : ${rank.score} stage : ${
              rank.stage
            }`}
          </UserRank>
        ))}
      </RankingView>
      <BackButton onClick={goBack}>Restart</BackButton>
    </RankPageView>
  );
};
const RankPageView = styled.div``;
const Title = styled.div`
  text-align: center;
  font-size: 52px;
  font-weight: 600;
`;
const BackButton = styled.div`
  border: black solid 3px;
  width: 100px;
  height: 34px;
  font-size: 22px;
  text-align: center;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 50px;
`;
const RankingView = styled.div`
  margin: 0 auto;
`;
const UserRank = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 15px;
`;
export default Rank;
