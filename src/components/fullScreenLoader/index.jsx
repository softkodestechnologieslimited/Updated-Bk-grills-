const { default: styled } = require("styled-components")

const FullScreenLoader = () => {

  return (
    <Wrapper>
      <div className="spinner-container"></div>
    </Wrapper>
  )
}

export default FullScreenLoader;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #1f1f1f2b;
  z-index: 200;

  .spinner-container {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(195, 195, 195, 0.6);
    border-radius: 50%;
    border-top-color: #636767;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
    @keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }
  }
`;