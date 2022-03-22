import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nickname = ({ getUserName, setEnrolled }) => {
  const [name, setName] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("name")) {
      console.log("page change!");
      nav("/colorFinder");
      console.log("!!");
    }
  });

  const onChange = (e) => {
    const { value } = e.target;
    setName(value);
  };
  const onSubmit = () => {
    console.log(`Hi ${name}!`);
    localStorage.setItem("name", name);
    getUserName();
    setEnrolled();
    nav("/colorFinder");
  };

  return (
    <RegisterView>
      <img src="img/logo.jpg" width={450}></img>
      <InputView>
        <NicknameView>
          <NicknameInput
            autoFocus
            value={name}
            onChange={onChange}
            placeholder="닉네임을 입력해주세요"
          />
        </NicknameView>
        <RegisterButton onClick={onSubmit}> 시작하기</RegisterButton>
      </InputView>
    </RegisterView>
  );
};

const RegisterView = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  padding-top: 10%;
`;
const TitleView = styled.p`
  text-align: center;
`;
const InputView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NicknameInput = styled.input`
  height: 25px;
`;
const NicknameView = styled.div``;
const RegisterButton = styled.button`
  height: 32px;
`;

export default Nickname;
