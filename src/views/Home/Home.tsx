import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getBannerList } from 'utils/api'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import CardImg from 'views/Home/components/CardImg'
import BabyUserInfo from 'views/Home/components/BabyUserInfo'
import BabyStats from 'views/Home/components/BabyStats'
import BabyTrade from 'views/Home/components/BabyTrade'

import 'swiper/swiper-bundle.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'
import 'style/swaper.css'

SwiperCore.use([Navigation, Pagination, Autoplay])

const StylePageHeader = styled.div`
  width: 100%;
  // min-height: 180px;
  // background: linear-gradient(180deg, #6EBAF3 0%, #3E86EB 100%), linear-gradient(0deg, #6BB9F3, #6BB9F3), linear-gradient(0deg, #FA7C92, #FA7C92), linear-gradient(180deg, #82F7FF 0%, #3A81EA 100%);
`

const StyleRow = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    flex: 0 0 100%;
    background: #ffffff;
    margin-bottom: 12px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: space-between;
    & > div {
      flex: 0 0 calc(33.33333% - 16px);
      background: #ffffff;
    }
  }
`
const StyleRowI = styled.div`
  display: flex;
  flex-direction: column;
  & > a {
    flex: 0 0 100%;
    /* background: #ffffff; */
    border-radius: 30px;
    margin-bottom: 12px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    & > a {
      flex: 0 0 calc(25% - 16px);
      /* background: #ffffff; */
      border-radius: 30px;
    }
    justify-content: space-between;
  }
`

const StyleBox = styled.div`
  margin-top: 56px;
  margin-bottom: 22px;
  > div:first-child {
    color: #FF7750;
    font-weight: 400;
  }
  > div:last-child {
    font-size: 12px;
  }
`

const Home: React.FC = () => {
  const { t } = useTranslation()
  const [banners, setBanners] = useState(['1', '2'])

  // useEffect(() => {
  //   getBannerList({}).then((res) => {
  //     setBanners(res.data.list)
  //   })
  // }, [])

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        }}
        pagination={{ clickable: true }}
        navigation
      >
        {/* {banners.map((itemSrc) => (
          <SwiperSlide key={itemSrc}>
            <StylePageHeader>
              <img src={`/images/banner-${itemSrc}.png`} alt="banner" width="100%" />
              {d.info.indexOf('http') === -1 ? <img src={d.url} alt={d.name} width="100%" /> : <a href={d.info} rel="noreferrer" target="_blank"><img src={d.url} alt={d.name} width="100%" /></a>}
            </StylePageHeader>
          </SwiperSlide>
        ))} */}

        <SwiperSlide>
          <StylePageHeader>
            <img src='./images/btbanner.png' width="100%" alt='' />
          </StylePageHeader>
        </SwiperSlide>
      </Swiper>
      <Page>
        <div>
          <StyleRow>
            <BabyUserInfo />
            <BabyStats />
            <BabyTrade />
          </StyleRow>
          <StyleBox>
            <Text mb="12px">{t('BTSwap')}</Text>
            <Text>
              {t(
                'The best AMM+NFT DEX for newborn projects on BSC, providing a more friendly trading experience and better project support.',
              )}
            </Text>
          </StyleBox>
          <StyleRowI>
            <CardImg icon="intro" name={t('Intro to BTSwap')} href="#" />
            <CardImg icon="support" name={t('Support for New Project')} href="#" />
            <CardImg icon="token" name={t('Tokenomics')} href="#" />
            <CardImg icon="doadmap" name={t('Roadmap')} href="#" />
          </StyleRowI>
        </div>
      </Page>
    </>
  )
}

export default Home
