import { Button, Grid } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import AuthModal from './AuthModal'

const Authentication = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const handleOpenAuthModal = () => setOpenAuthModal(true)
  const handleCloseAuthModal = () => setOpenAuthModal(false)

  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={6}>
          <div
            style={{
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
            className="w-full h-screen"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ width: '40%', height: '40%' }}
              className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"
            >
              <g>
                <path
                  fill="white"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                ></path>
              </g>
            </svg>
          </div>
        </Grid>
        <Grid
          container
          item
          lg={5}
          xs={12}
          className="px-10"
          alignItems="center"
          justifyContent="flex-end"
          style={{ height: '100vh' }}
        >
          <div>
            <h1 className="font-bold text-7xl">지금 일어나고 있는 일</h1>
            <h1 className="font-bold text-3xl py-16">지금 가입하세요.</h1>
            <div className="w-[60%]">
              <div className="w-full">
                <div style={{ width: '100%' }}>
                  <GoogleLogin style={{ width: '100%' }} />
                </div>
                <p className="py-5 text-center">또는</p>
                <Button
                  onClick={handleOpenAuthModal}
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: '29px',
                    py: '7px',
                  }}
                >
                  계정 만들기
                </Button>

                <p className="text-sm mt-2">
                  가입하시려면 쿠키 사용을 포함해 이용약관과 개인정보 처리방침에
                  동의해야 합니다.
                </p>
              </div>
              <div className="mt-10">
                <h1 className="font-bold text-xl mb-5">
                  이미 계정이 있으신가요?
                </h1>
                <Button
                  onClick={handleOpenAuthModal}
                  fullWidth
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: '29px',
                    py: '7px',
                  }}
                >
                  로그인
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
    </div>
  )
}

export default Authentication
