/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const ModalSlide = ({ content }) => (
  
  <div
    css={css`
      height: 100%;
      width: 100%;
      background-image: url('${content}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    `}
  />
)

export default ModalSlide