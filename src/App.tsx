import styled from "styled-components";

function App() {
  return <Container><H1>TypeScript!</H1></Container>;
}
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

export default App;
