import styled from 'styled-components'
import { Spinner as SpinnerWrapper } from 'reactstrap'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Spinner = styled(SpinnerWrapper)`
  width: ${props => props.size};
  height: ${props => props.size};
`
