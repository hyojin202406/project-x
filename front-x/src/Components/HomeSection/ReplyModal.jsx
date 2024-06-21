import { Button, Avatar } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: 4
};

const ReplyModal = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate()

  return (
    <div>
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <div className='flex space-x-5'>
        <Avatar
          onClick={() => navigate(`/profile/${6}`)}
          className='cursor-pointer'
          alt="username"
          src="/images/profile.png"
        />
        <div className='w-full'>
          <div className='flex justify-between items-center'>

            <div className='flex cursor-pointer items-center space-x-2'>
              <span className='font-semibold'>Code With Hyojin</span>
              <span className='text-gray-600'>@Hyojin . 2m</span>
              <img className='ml-2 w-5 h-5' src="https://abs-0.twimg.com/emoji/v2/svg/1f31e.svg" alt="" />
            </div>



          </div>

          <div className='mt-2'>
            <div onClick={() => navigate(`/twit/${3}`)} className='cursor-pointer'>
              <p className='mb-2 p-0'>hello !</p>
            </div>

          </div>
        </div>
      </div>
      </Box>
    </Modal>
  </div>
  )
}

export default ReplyModal