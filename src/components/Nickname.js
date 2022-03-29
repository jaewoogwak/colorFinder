import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nickname = ({ getUserName, setEnrolled, onClickReStart }) => {
  const [name, setName] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("name")) {
      console.log("page change!");
      nav("/home");
      console.log("!!");
    }
  }, []);

  const onChange = (e) => {
    const { value } = e.target;
    setName(value);
  };
  const onSubmit = () => {
    console.log(`Hi ${name}!`);
    localStorage.setItem("name", name);
    getUserName();
    setEnrolled();
    onClickReStart();
    nav("/home");
  };

  return (
    <RegisterView>
      <TitleView>Color Finder</TitleView>
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
  font-size: 50px;
  font-weight: 900;
`;
const InputView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 140px;
`;
const NicknameInput = styled.input`
  height: 25px;
`;
const NicknameView = styled.div``;
const RegisterButton = styled.button`
  height: 32px;
`;

export default Nickname;
// 휴지말이두루 : 박세현 1등!!!!!!!!!!!!!!!!♥
