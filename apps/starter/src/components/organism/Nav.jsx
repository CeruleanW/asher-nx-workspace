import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const StyledNav = styled.nav`
  background-color: ${(props) => props.theme.palette.primary};
`;

export function Nav(props) {
  const { isMenuOpened = false, setIsMenuOpened = () => '', title } = props;
  return (
    <StyledNav className="w-full flex p-3">
      <button className="h-full">
        <FontAwesomeIcon
          icon={faBars}
          size="1x"
          fixedWidth
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        />
      </button>
      <p className="flex-auto text-center text-2xl m-0">{title}</p>
      <button className="h-full">
        <FontAwesomeIcon
          icon={faEllipsisH}
          size="1x"
          fixedWidth
          onClick={() => console.log('ellipsis clicked')}
        />
      </button>
    </StyledNav>
  );
}
