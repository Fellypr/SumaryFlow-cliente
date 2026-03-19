import React from 'react';
import styled from 'styled-components';

const MessageSuccess = ({success}) => {
  return (
    <StyledWrapper>
      <div className="success">
        <div className="success__icon">
          <svg fill="none" height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z" fill="#393a37" fillRule="evenodd" /></svg>
        </div>
        <div className="success__title">{success}</div>
        
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOutToRight {
    from {
      opacity: 1;
      transform: translateX(-50px);
    }
    to {
      opacity: 0;
      transform: translateX(30px);
    }
  }

  .success {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 420px;
    min-width: 320px;
    height:auto;
    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    background: #EDFBD8;
    border-radius: 8px;
    box-shadow: 0px 0px 5px -3px #111;
    animation: slideInFromRight 0.6s ease-out forwards, slideOutToRight 0.6s ease-in forwards ;
    animation-delay: 0s, 5s;
  }

  .success__icon {
    width: 20px;
    height: 20px;
    transform: translateY(-2px);
    margin-right: 8px;
  }

  .success__icon path {
    fill: #84D65A;
  }

  .success__title {
    font-weight: 500;
    font-size: 14px;
    color: #2B641E;
  }

  .success__close {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: auto;
  }

  .success__close path {
    fill: #2B641E;
  }`;

export default MessageSuccess;
