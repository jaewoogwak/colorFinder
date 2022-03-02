import { Link, useNavigate } from "react-router-dom";

const Rank = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>Ranking page</h1>
      <button onClick={goBack}>돌아가기</button>
    </div>
  );
};

export default Rank;
