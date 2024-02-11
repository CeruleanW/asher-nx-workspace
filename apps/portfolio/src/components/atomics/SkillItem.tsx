import { Typography2 } from '@root/shared/components/atomics/Typography';
import { ListItem } from '@root/shared/components/atomics/ListItem';
import styles from '../../styles/components/components.module.scss';
import styled from 'styled-components';

const Li = styled.li`
    margin-right: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 18px;
    border: 2px solid #d0dbec;
    display: flex;
    font-weight: 500;
    color: #444;

    &:hover {
      background-image: -webkit-linear-gradient(-70deg,#2cda86,#469cff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      border: 2px solid #96b5e6;
      color: #fff;
    }
`;

const Span = styled.span`
  padding: 0rem 0.5rem;
`;

export const SimpleSkill = (props) => {
  return (
    <ListItem>
      <Typography2>
        <span style={{ color: 'cadetblue', marginRight: '6px' }}>●</span>
        {props.children}
      </Typography2>
    </ListItem>
  );
};

export const Skill = (props) => {
  return <Li className={`${styles['skill-item']} rounded-xl`}><Span>{props.children}</Span></Li>;
};

export const ExpandableSkill = (props) => {
  return <SimpleSkill>{props.children}</SimpleSkill>;
};
