import { Container, Spinner } from './style'

function Loading({ color = 'primary', size = '2rem', ...rest }) {
  return (
    <Container {...rest}>
      <Spinner size={size} color={color} type='grow' />
    </Container>
  )
}

export { Loading }
