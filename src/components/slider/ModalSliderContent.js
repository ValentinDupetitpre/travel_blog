import styled from '@emotion/styled'

const ModalSliderContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: ${props => props.height};
  width: ${props => props.width}px;
  display: flex;
`
export default ModalSliderContent