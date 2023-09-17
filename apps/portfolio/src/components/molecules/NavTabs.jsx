import { Tabs } from '@material-ui/core/';
import { Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledTab = styled(Tab)`
  font-family: 'Raleway', sans-serif;
  width: 9rem;
`;

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

/**
 *
 * @returns
 */
export default function NavTabs({routes, value, labels}) {
  const allTabs = routes; //["/", "/projects", "/aboutme", "/contact"];

  const renderTabs = allTabs.map((route, index) => (
    <StyledTab
      label={labels[index]}
      value={route}
      component={Link}
      to={route}
      key={route}
      {...a11yProps(index)}
    />
  ));

  return (
    <Tabs value={value} centered aria-label="navigation tabs">
      {renderTabs}
    </Tabs>
  );
}
