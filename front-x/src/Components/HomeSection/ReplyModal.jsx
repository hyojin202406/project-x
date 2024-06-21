import { Button, Avatar } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';

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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // 변경: 초기값 null로 설정
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate()

  
  const handleSubmit = (values) => {
    console.log("handle submit", values)
  }

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitId: 4
    },
    onSubmit: handleSubmit
  })

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = URL.createObjectURL(event.target.files[0]); // 파일 URL 생성
    formik.setFieldValue("image", event.currentTarget.files[0]); // formik 상태 업데이트
    setSelectedImage(imgUrl); // 선택된 이미지 업데이트
    setUploadingImage(false);
  };

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

        <section className='pb-10'>
          <div className='flex space-x-5'>
            <Avatar
              alt="username"
              src="/images/profile.png"
            />
            <div className='w-full'>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    type="text"
                    name='content'
                    placeholder='What is happening?!'
                    className='border-none outline-none text-xl bg-transparent'
                    {...formik.getFieldProps("content")}
                  />
                  {formik.errors.content && formik.touched.content && (
                    <span className='text-red-500'>{formik.errors.content}</span>
                  )}
                </div>
                <div>
                  {selectedImage && (
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  )}
                </div>
                <div className='flex justify-between items-center mt-5'>
                  <div className='flex space-x-5 items-center'>
                    <label className='flex items-center space-x-2 rounded-md cursor-pointer'>
                      <ImageIcon className='text-[#1d9bf0]' />
                      <input
                        type="file"
                        name='imageFile'
                        className='hidden'
                        onChange={handleSelectImage}
                        accept="image/*" // 이미지 파일만 선택 가능하도록 설정
                      />
                    </label>
                    <FmdGoodIcon className='text-[#1d9bf0]' />
                    <TagFacesIcon className='text-[#1d9bf0]' />
                  </div>
                  <div>
                    <Button
                      sx={{ width: "100%", borderRadius: "20px", paddingY: "8px", paddingX: "20px", bgcolor: "1e88e5" }}
                      variant='contained'
                      type='submit'
                    >
                      Tweet
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      </Box>
    </Modal>
  </div>
  )
}

export default ReplyModal