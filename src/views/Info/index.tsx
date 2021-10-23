import React from 'react'
// import { Route, useRouteMatch, Link } from 'react-router-dom'
import { Heading } from '@pancakeswap/uikit'
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
  margin-top: -15px;
  font-size: 48px;
  line-height: 58px;
  color: #2483ff;
`

const Info = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader>
        <StyleHeading as="h1" scale="xl" color="textSubtle" mb="20px">
          {t('Info')}
        </StyleHeading>
        <StyleHeadingFamily scale="lg" color="textSubtle">
          {t('Info simply token to earn.')}
        </StyleHeadingFamily>
      </PageHeader>
      <Page>
        <StyleCome>Coming soon</StyleCome>
      </Page>
    </>
  )
}

export default Info
