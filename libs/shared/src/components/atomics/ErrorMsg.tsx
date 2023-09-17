import styled from 'styled-components';

const Container = styled.div`
  color: ${(props) => props.theme.palette.danger};
`;

export const ErrorSpan = styled.span`
  color: ${(props) => props.theme.palette.danger};
`;

export function ErrorMsg({ ...optionals }) {
  const {
    text = 'An error has occurred',
    title = 'Error',
    children,
    error,
    ...rest
  } = optionals;

  return (
    <Container>
      <strong>{title}</strong>
      <p>{text}</p>
      {children}
    </Container>
  );
}

export function RequiredErrorMsg(props) {
  return <ErrorSpan {...props}>This field is required</ErrorSpan>;
}
