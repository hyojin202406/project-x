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
import { FavoriteOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { createReTweet, likeTweet } from '../Store/Twit/Action'

const TweetCard = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [openReplyModal, setOpenReplyModal] = useState(false)
  const handleOpenReplyModal = () => setOpenReplyModal(true)
  const handleCloseReplyModal = () => setOpenReplyModal(false)
  const dispatch = useDispatch()

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
    dispatch(createReTweet(item.id))
    console.log('handle create retweet ')
  }

  const handleLiketweet = () => {
    dispatch(likeTweet(item._id))
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
          onClick={() => navigate(`/profile/${item?.user.id}`)}
          className="cursor-pointer"
          alt="username"
          src="/images/profile.png"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className="text-gray-600">
                @{item?.user?.fullName.split(' ').join('_').toLowerCase()}
              </span>
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
              onClick={() => navigate(`/twit/${item?.id}`)}
              className="cursor-pointer"
            >
              <p className="mb-2 p-0">{item?.content}</p>
              <img
                className="w-[28rem] border border-gray-400 p-5 rounded-md"
                // src="https://plus.unsplash.com/premium_photo-1718747305176-8dab6d6abece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                src={item?.image}
                alt=""
              />
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
                <p>{item?.totalReplies}</p>
              </div>

              <div
                className={`${item?.liked ? 'text-pink-600' : 'text-gray-600'} space-x-3 flex items-center`}
              >
                <RepeatIcon
                  onClick={handleCreateRetweet}
                  className="cursor-pointer"
                />
                <p>{item?.totalRetweets}</p>
              </div>

              <div
                className={`${item?.liked ? 'text-pink-600' : 'text-gray-600'} space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteOutlined
                    onClick={handleLiketweet}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteIcon
                    onClick={handleLiketweet}
                    className="cursor-pointer"
                  />
                )}
                <p>{item?.totalLikes}</p>
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
        <ReplyModal
          item={itme}
          open={openReplyModal}
          handleClose={handleCloseReplyModal}
        />
      </section>
    </React.Fragment>
  )
}

export default TweetCard
