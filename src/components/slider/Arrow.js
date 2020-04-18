/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const Arrow = ({ direction, handleClick }) => (
  <div
    onClick={handleClick}
    css={css`
      display: flex;
      position: absolute;
      top: 50%;
      ${direction === 'right' ? `right: 25px` : `left: 25px`};
      height: 50px;
      width: 50px;
      justify-content: center;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      align-items: flex-end;
      transition: transform ease-in 0.1s;
      &:hover {
        transform: scale(1.1);
      }
      span {
        transform: translateX(${direction === 'left' ? '-2' : '2'}px);
        color: grey;
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 2px;
        &:focus {
          outline: 0;
        }
      }
    `}
  >
    {direction === 'right' ? <span>&gt;</span> :  <span>&lt;</span>}
  </div>
)

export default Arrow