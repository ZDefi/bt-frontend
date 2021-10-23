import React from 'react'
import { Heading } from '@pancakeswap/uikit'
import styled from 'styled-components'
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
  color: #e89d39;
`

const PoolCome = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader>
        <StyleHeading as="h1" scale="xl" color="textSubtle" mb="24px">
          {t('Pools')}
        </StyleHeading>
        <Heading scale="md" color="text">
          {t('Just stake some tokens to earn.')}
        </Heading>
      </PageHeader>
      <Page>
        <StyleCome>Coming soon</StyleCome>
      </Page>
    </>
  )
}

export default PoolCome
