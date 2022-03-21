import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nickname = ({ getUserName }) => {
  const [name, setName] = useState("");
  const nav = useNavigate();
  if (localStorage.getItem("name")) {
    console.log("page change!");
    nav("/colorFinder");
  }

  const onChange = (e) => {
    const { value } = e.target;
    setName(value);
  };
  const onSubmit = () => {
    console.log(`Hi ${name}!`);
    localStorage.setItem("name", name);
    getUserName();
    nav("/colorFinder");
  };

  return (
    <div>
      <input value={name} onChange={onChange}></input>
      <button onClick={onSubmit}>시작하기</button>
    </div>
  );
};

export default Nickname;
