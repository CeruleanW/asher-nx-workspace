import { useMainPageData } from '../hooks';
import { ErrorMsg } from '@root/shared/components/atomics/ErrorMsg';
import PageTemplate from '@root/shared/components/template/PageTemplate';
import { CenteredLoader } from '@root/shared/components/atomics/Loading';
// import { processMainData } from '../lib/main/processors';
// import { BoxCard } from '../components/molecule/BoxCard';
import { Tabs } from '../components/organism/Tabs';
import { useState } from 'react';
import { TabPanel } from '../components/organism/TabPanel';
import { EditorPanel } from '../components/organism/Editor';
import { Board } from '../components/organism/Board';
// import { Nav } from '@root/shared/components/organism/Nav';
import { MenuAppBar } from '../components/organism/AppBar';
import { Protected } from '../features/auth/components/Protected';
import React from "react";
import { BoxPanel } from '../components/panel/BoxPanel';

/**
 * should show all the boxes of current user
 */
export function MainPage() {

  // Hook
  const { boxes, user, error, isLoading } = useMainPageData();

  // State
  const [tab, setTab] = useState(0);

  if (error) {
    return <ErrorMsg text={error?.message} />;
  } else if (isLoading) {
    return <CenteredLoader data-cy={'main-loader'}/>;
  }

  // console.debug('Main data', data);
  // const processed = processMainData(data);
  const handleChange = (event, newValue) => {
    // console.log("🚀 ~ file: main.tsx:40 ~ handleChange ~ newValue", newValue)
    setTab(newValue);
  };

  return (
    <>
        <PageTemplate>
          <MenuAppBar title={'Idea Dropper'} ></MenuAppBar>
          <div className={'flex gap-x-4 mx-4 flex-grow max-w-full'} >
            <TabPanel value={tab} index={0} className='gap-x-8' >
              <BoxPanel data={boxes}></BoxPanel>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <EditorPanel tags={boxes} userID={user?._id} />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Board />
            </TabPanel>
          </div>
          <Tabs onChange={handleChange} value={tab} />
        </PageTemplate>
    </>
  )
}

export default MainPage
