import React from 'react'
import { Image, Heading, Text } from '@pancakeswap/uikit'
import Page from 'components/layout/Page'
import styled from 'styled-components'
import CountDown from './components/countdown'
// import CountDown from './components/countdown'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 12px;
`
const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`
const StyledBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 3px 8px rgba(58, 126, 190, 0.09);
  border-radius: 84.5px;
  padding: 2rem 4rem;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTitle = styled(Heading)`
  color: #FF7750;
  font-size: 1.6rem;
`
const StyledText = styled(Heading)`
  color: #d06029;
  margin-top: 12px;
`
const Coming = () => {
  return (
    <Page>
      <StyledWrapper>
        <StyledImage src="/images/ilo/coming1.svg" alt="illustration" width={200} height={113} />
        <Text bold fontSize="1.2rem">
          The best AMM for new projects on Binance Smart Chain
        </Text>
        <StyledBox>
          <StyledTitle>VDR token ILO Starts</StyledTitle>
          <StyledText>11:00 AM UTC May 31</StyledText>
        </StyledBox>
        <Text mt="24px">
          Will be live in <CountDown timeStamp="1622131199" />
        </Text>
      </StyledWrapper>
    </Page>
  )
}

export default Coming
