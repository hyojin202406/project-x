import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TweetCard from '../HomeSection/TweetCard';

const Profile = () => {

  const [tabValue, setTabValue] = useState("1")

  const navigate = useNavigate()
  
  const handleBack = () => {
    navigate(-1);
  }

  const handleOpenProfile = () => {
    console.log("open profile model")
  }

  const handleFollowUser = () => {
    console.log("handleFollowUser")
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    if (newValue === 4) {
      console.log("liokes twit")
    } else if (newValue === 1) {
      console.log("users twits")
    }
  }

  return (
    <div>
      <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack}/>
        <h1 className='py-5 text-xl font-bold placeholder-opacity-90 ml-5'>Code With Hyojin</h1>
      </section>

      <section>
        <img className='w-[100%] h-[15rem] object-cover' src="https://images.unsplash.com/photo-1717799513336-b9b42139d79d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </section>

      <section className='pl-6'>
        <div className='flex justify-between items-start mt-5 h-[5rem]'>
        <Avatar
            className='trasnform -translate-y-24'
            alt="username"
            src="/images/profile.png"
            sx={{width:"10rem", height:"10rem", border:"4px solid white"}}
          />

        {
          true ? (
            <Button 
            onClick={handleOpenProfile}
            className='rounded-full' variant='contained' sx={{borderRadius:"20px"}}>Edit Profile</Button>
          ) : (
            <Button 
            onClick={handleFollowUser}
            className='rounded-full' variant='contained' sx={{borderRadius:"20px"}}>
              {true ? "Follow" : "Unfollow"}
            </Button>
          )
          
        }

        </div>

        <div>
          <div className='flex items-center'>
            <h1 className='font-bold text-lg'>Hyojin</h1>
            {true && (<img className='ml-2 w-5 h-5' src="https://abs-0.twimg.com/emoji/v2/svg/1f31e.svg" alt="" />)}
            <h1 className='text-gray-500'>@Hyojin</h1>
          </div>
        </div>

        <div className='mt-2 space-y-3'>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          </p>

          <div className='py-1 flex space-x-5'>
            <div className='flex items-center text-gray-500'>
              <BusinessCenterIcon/>
              <p className='ml-2'>Programmer</p>
            </div>
            <div className='flex items-center text-gray-500'>
              <LocationOnIcon/>
              <p className='ml-2'>Korea</p>
            </div>
            <div className='flex items-center text-gray-500'>
              <CalendarMonthIcon/>
              <p className='ml-2'>Joined 2024</p>
            </div>
          </div>
          
          <div className='flex items-center space-x-5'>
            <div className='flex items-center space-x-1 font-semibold'>
              <span>190</span>
              <span className='text-gray-500'>Following</span>
            </div>
            <div className='flex items-center space-x-1 font-semibold'>
              <span>590</span>
              <span className='text-gray-500'>Followers</span>
            </div>
          </div>
        </div>

      </section>

      <section className='py-5'>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Replies" value="2" />
            <Tab label="Media" value="3" />
            <Tab label="Likes" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {[1,1,1,1].map((item) => <TweetCard/>)}
        </TabPanel>
        <TabPanel value="2">Replies</TabPanel>
        <TabPanel value="3">Media</TabPanel>
        <TabPanel value="4">Likes</TabPanel>
      </TabContext>
    </Box>
      </section>
    </div>
  )
}

export default Profile