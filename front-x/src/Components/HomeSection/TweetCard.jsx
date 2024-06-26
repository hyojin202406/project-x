import { Button, Avatar, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import RepeatIcon from '@mui/icons-material/Repeat'
import { useNavigate } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import BarChartIcon from '@mui/icons-material/BarChart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ReplyModal from './ReplyModal'

const TweetCard = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [openReplyModal, setOpenReplyModal] = useState(false)
  const handleOpenReplyModal = () => setOpenReplyModal(true)
  const handleCloseReplyModal = () => setOpenReplyModal(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigate = useNavigate()

  const handleDeleteTweet = () => {
    console.log('dlelete tweet')
    handleClose()
  }

  const handleEditTweet = () => {
    console.log('edit tweet')
    handleClose()
  }

  const handleCreateRetweet = () => {
    console.log('handle create retweet ')
  }

  const handleLiketweet = () => {
    console.log('handle like tweet ')
  }

  return (
    <React.Fragment>
      {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
        <RepeatIcon/>
        <p>You Retweet</p>
      </div> */}

      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${6}`)}
          className="cursor-pointer"
          alt="username"
          src="/images/profile.png"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">Code With Hyojin</span>
              <span className="text-gray-600">@Hyojin . 2m</span>
              <img
                className="ml-2 w-5 h-5"
                src="https://abs-0.twimg.com/emoji/v2/svg/1f31e.svg"
                alt=""
              />
            </div>

            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                <MenuItem onClick={handleEditTweet}>Edit</MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            <div
              onClick={() => navigate(`/twit/${3}`)}
              className="cursor-pointer"
            >
              <p className="mb-2 p-0">hello !</p>
              <img
                className="w-[28rem] border border-gray-400 p-5 rounded-md"
                src="https://plus.unsplash.com/premium_photo-1718747305176-8dab6d6abece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
                <p>43</p>
              </div>

              <div
                className={`${true ? 'text-pink-600' : 'text-gray-600'} space-x-3 flex items-center`}
              >
                <RepeatIcon
                  onClick={handleLiketweet}
                  className="cursor-pointer"
                />
                <p>54</p>
              </div>

              <div
                className={`${true ? 'text-pink-600' : 'text-gray-600'} space-x-3 flex items-center`}
              >
                {true ? (
                  <FavoriteIcon
                    onClick={handleLiketweet}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={handleLiketweet}
                    className="cursor-pointer"
                  />
                )}
                <p>54</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
                <p>430</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <ReplyModal open={openReplyModal} handleClose={handleCloseReplyModal} />
      </section>
    </React.Fragment>
  )
}

export default TweetCard
