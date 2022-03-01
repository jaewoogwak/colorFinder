import { useState } from "react";
import styled from "styled-components";
const Box = ({ id, onClick, randomNum, randomColor, color }) => {
  return (
    <Space
      id={id}
      onClick={onClick}
      isRandom={id == randomNum}
      randomColor={randomColor}
      color={color}
    >
      {/* {id == randomNum ? "rd" : "box"} */}
    </Space>
  );
};

const Space = styled.div`
  border: 1px solid black;
  background-color: ${(props) =>
    props.isRandom ? props.color : props.randomColor};
  text-align: center;
`;

export default Box;
