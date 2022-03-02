import { Link, useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import app from "../fb";
import { useEffect, useState } from "react";

const db = getFirestore();

const Rank = () => {
  const [userRank, setUserRank] = useState([]);
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
        rank: doc.data().rank,
        score: doc.data().score,
        stage: doc.data().stage,
      });
    });
    setUserRank(tmpAry);
  };
  useEffect(() => {
    readData();
  }, []);
  console.log("userrank", userRank);
  return (
    <div>
      <h1>Ranking page</h1>
      <button onClick={goBack}>돌아가기</button>
      <div></div>
    </div>
  );
};

export default Rank;
