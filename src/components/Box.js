import { useState } from "react";
import styled from "styled-components";
const Box = ({ id, onClick }) => {
  return (
    <Space id={id} onClick={onClick}>
      box
    </Space>
  );
};

const Space = styled.div`
  border: 1px solid black;
  text-align: center;
`;

export default Box;
