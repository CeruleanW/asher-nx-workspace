import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
/**
 *
 */
export function Tabs({ value, onChange, ...optionals }) {
  return (
    <div>
      <MuiTabs
        aria-label="basic tabs example"
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
        onChange={onChange}
        value={value}
      >
        <Tab label="Box" />
        <Tab label="Card" />
        <Tab label="Board" />
      </MuiTabs>
    </div>
  );
}
