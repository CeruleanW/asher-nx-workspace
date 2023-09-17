// import { useState } from 'react';
// import Footer from './Footer/Footer';
// import { SideMenu } from './SideMenu';
// import { Nav } from './Nav';
// import Tabs from './Tabs';
// import Tab from './Tab';

const tabTypes = ['box', 'add', 'board'];

export function FrameWrapper({ title, ...optionals }) {
  const {children, activeTab, ...rest} = optionals;
  // const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <header className='w-full'>
          {/* <Nav
            isMenuOpened={isMenuOpened}
            setIsMenuOpened={setIsMenuOpened}
            title={title}
          /> */}
        </header>
        <div className='flex flex-1 justify-start' >
          {/* {isMenuOpened ? <SideMenu /> : null} */}
          {children}
        </div>
        {/* <Tabs>
          {tabTypes.map( (type, index) => <Tab type={type} active={type === activeTab} key={`tab-${index}`} />)}
        </Tabs> */}
        {/* <Footer /> */}
      </div>
    </>
  );
}
