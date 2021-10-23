import React from 'react'
// import { Route, useRouteMatch, Link } from 'react-router-dom'
import { Heading, Image } from '@pancakeswap/uikit'
import styled from 'styled-components'
// import Container from 'components/layout/Container'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'contexts/Localization'

const StyleHeading = styled(Heading)`
  text-shadow: 0px 4px 0px #ffffff;
`
const StyleHeadingFamily = styled(Heading)`
  font-size: 18px;
  line-height: 22px;
`

const StyleCome = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;
  margin-left: -146px;
  margin-top: -179px;
  font-size: 48px;
  line-height: 58px;
  color: #e89d39;
  display: flex;
  flex-direction: column;
  align-items: center;
`


const Bottles = () => {
  const { t } = useTranslation()
  //   const { path, url, isExact } = useRouteMatch()

  return (
    <>
      <PageHeader>
        <StyleHeading as="h1" scale="xl" color="textSubtle" mb="20px">
          {t('Bottle')}
        </StyleHeading>
        <StyleHeadingFamily scale="lg" color="textSubtle">
          {t('Stake BABY to Vote.')}
        </StyleHeadingFamily>
      </PageHeader>
      <Page>
        <StyleCome><Image src="/images/bottles.svg" alt="Bottles" width={150} height={300} />Coming soon</StyleCome>
      </Page>
    </>
  )
}

export default Bottles
