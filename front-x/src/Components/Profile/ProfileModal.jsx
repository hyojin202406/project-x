import React from 'react'
import Box from '@mui/material/Box';
import { Avatar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField } from '@mui/material';
import './ProfileModal.css'

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
  outlined:"none",
  borderRadius: 4,
};


const ProfileModal = ({open, handleClose}) => {
  // const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handleSubmit = (values) => {
    console.log("handle submit", values)
  }

  const formik=useFormik({
    initialValues: {
      fullName : "",
      website : "",
      location : "",
      bio : "",
      backgroundImage : "",
      image : ""
    },
    onSubmit: handleSubmit
  })

  const handleImageChange = (event) => {
    setUploading(true)
    const {name} = event.target
    const file = event.target.files[0]
    setUploading(false)
  }

  return (
    <div>
      {/* <Button onClick={open}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon/>
                </IconButton>
                <p className='text-sm '>Edit Profile</p>
              </div>
              <Button type='submit'>Save</Button>
            </div>
            <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
              <React.Fragment>
                <div className='w-full'>
                  <div className='relative h-[12rem] object-cover object-center'>
                    <img className='w-[100%] h-[12rem] object-cover' src="https://images.unsplash.com/photo-1717799513336-b9b42139d79d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      
                    <input type="file"
                      className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' 
                      onChange={handleImageChange}
                      name="backgroundImage"
                      />
                  </div>
                </div>
                <div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
                  <div className='relative'>
                    <Avatar
                      alt="username"
                      src="/images/profile.png"
                      sx={{width:"10rem", height:"10rem", border:"4px solid white"}}
                    />
                    <input 
                      className='absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer'
                      onChange={handleImageChange}
                      name="image"
                      type="file" />
                  </div>
                </div>
              </React.Fragment>

              <div className='space-y-3'>
                <TextField
                  fullWidth
                  id='fullName'
                  name='fullName'
                  label='fullName'
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />   

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id='bio'
                  name='bio'
                  label='bio'
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />

                <TextField
                  fullWidth
                  id='website'
                  name='website'
                  label='website'
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                />   

                <TextField
                  fullWidth
                  id='location'
                  name='location'
                  label='location'
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />

                <div className='my-3'>
                  <p className='text-lg'>Birth date . Edit</p>
                  <p className='text-2xl'>October 26, 1999</p>
                </div>
                <p className='py-3 text-lg'>Edit Professional Profile</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default ProfileModal