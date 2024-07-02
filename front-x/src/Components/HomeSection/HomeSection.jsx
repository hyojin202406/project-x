import { Avatar, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import TweetCard from './TweetCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTweets, createTweet } from '../Store/Twit/Action'

const validationSchema = Yup.object().shape({
  content: Yup.string().required('Tweet text is required'),
})

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const dispatch = useDispatch()
  const { twit } = useSelector((store) => store)

  const handleSubmit = (values) => {
    console.log('Submitted values:', values)
    dispatch(createTweet(values))
  }

  useEffect(() => {
    dispatch(getAllTweets())
  }, [dispatch, twit.like, twit.retwit])

  const formik = useFormik({
    initialValues: {
      content: '',
      image: null,
    },
    onSubmit: handleSubmit,
    validationSchema,
  })

  const handleSelectImage = (event) => {
    const file = event.currentTarget.files[0]
    if (file) {
      setUploadingImage(true)
      const imgUrl = URL.createObjectURL(file)
      formik.setFieldValue('image', file)
      setSelectedImage(imgUrl)
      setUploadingImage(false)
    }
  }

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar alt="username" src="/images/profile.png" />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening?!"
                  className="border-none outline-none text-xl bg-transparent"
                  {...formik.getFieldProps('content')}
                />
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
              </div>
              <div>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                )}
              </div>
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                      accept="image/*"
                    />
                  </label>
                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <TagFacesIcon className="text-[#1d9bf0]" />
                </div>
                <div>
                  <Button
                    sx={{
                      width: '100%',
                      borderRadius: '20px',
                      paddingY: '8px',
                      paddingX: '20px',
                      bgcolor: '1e88e5',
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Tweet
                  </Button>
                </div>
              </div>
            </form>
            <div>{selectedImage && <img src="{selectedImage}" alt="" />}</div>
          </div>
        </div>
      </section>
      <section>
        {twit.twits.map((item) => (
          <TweetCard key={item?.id} item={item} />
        ))}
      </section>
    </div>
  )
}

export default HomeSection
