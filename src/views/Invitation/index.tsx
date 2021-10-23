import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { Flex, Input as UIKitInput, Text, Button, Box} from '@pancakeswap/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { getUser, getPeers, getUserSub, regUserBind } from 'utils/api'
import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'

import InviCard from './components/InviCard'
import PersionCard from './components/PersionCard'
import InviTable from './components/InviTable'

const Header = styled.div<{ url: string }>`
  width: 100%;
`
const Title = styled(Text)`
  color: #FF7750;
  text-align: center;
  font-weight: bold;
  font-family: Source Han Sans CN;
  word-wrap:break-word;
`
const SearchDiv = styled.div`
  width: 268px;
  height: 55px;
  padding-top: 10px;
  margin-right: 10px;
  background-image: url('/images/search-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
`
const SearchInput = styled(UIKitInput)`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding-left: 19px;
  box-shadow: none;
  &::placeholder {
    color: #464545;
    opacity: 0.5;;
  }
  &:focus:not(:disabled) {
    box-shadow: none;
  }
`
const BindFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: center;
  }

`
const Grid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  padding-bottom: 24px;
  padding-top: 24px;


  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Invitation = () => {
  const { t } = useTranslation()
  const { toastError } = useToast()
  const [parent, setParent] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [userSubList, setUserSubList] = useState([])
  const [peers, setPeers] = useState([])
  const { account } = useWeb3React()
  useEffect(() => {
    if (account) {
      getUser({ address: account}).then((res) => {
        setUserInfo(res.data)
      })
      getUserSub({ address: account }).then((res) => {
        const { data = {} } = res
        const { sublist = [] } = data
        setUserSubList(sublist)
      })
    }
    getPeers({}).then((res) => {
      const {data = {}} = res
      const {peerlist = []} = data
      setPeers(peerlist)
    })
  }, [account])
  const tableTitle = [{
    title: 'Address',
    key: 'address'
  }, {
    title: 'VDR',
    key: 'bee'
  }, {
    title: 'Point',
    key: 'points'
  }
  ]
  const tableTitleTwo = [{
    title: 'Address',
    key: 'address'
  }, {
    title: 'Node Point',
    key: 'nodePoint'
    }, {
    title: 'Rank',
    key: 'rank'
    }
  ]
  const handleChange = (e) => {
    setParent(e.target.value)
  }
  const binding = () => {
    const params = {
      address: account,
      parent
    }
    regUserBind(params).then((res: any) => {
      if (+res.code === 200) {
        getUser({ address: account }).then((result) => {
          setUserInfo(result.data)
        })
      } else {
        toastError(res.message)
      }
    }, err => {
      toastError(err.toString())
    })
  }
  return (
    <>
      <Header url="/images/banner-2.png">
        <img src="/images/banner-2.png" alt="banner" width="100%" />
      </Header>
      {account
        ? 
          <Page>
            {
              userInfo
              ?
                <>
                  {
                    userInfo+userInfo.parent === 0
                    ? <div><Title fontSize="20px" mt="29px" mb="17px">{account}</Title></div>
                    : <div><Title fontSize="20px"  mt="29px" mb="17px">{t(`My referrer address`)}: {userInfo.parent}</Title></div>
                  }
                  <Grid>
                    <Box mt="22px">
                      <InviCard title={t("Personal statistics")}>
                        <PersionCard info={userInfo} />
                      </InviCard>
                    </Box>
                    <Box mt="20px">
                      <InviCard title={t("My followers")}>
                        <InviTable col={tableTitle} tableData={userSubList} more={false} />
                      </InviCard>
                    </Box>
                    <Box mt="22px">
                      <InviCard title={t("Current node")}>
                        <InviTable col={tableTitleTwo} tableData={peers} more={false} />
                      </InviCard>
                    </Box>
                  </Grid>
                </>
              :
                <BindFlex>
                  <SearchDiv>
                    <SearchInput placeholder={t('Enter the address of the referrer')} value={parent} onChange={handleChange} />
                  </SearchDiv>
                  <Button onClick={binding}>{t('Bind')}</Button>
                </BindFlex>
            }
          </Page>
        : 
        <Flex justifyContent="center">
          <UnlockButton mt="180px" />
        </Flex>
      }
    </>
  )
}

export default Invitation
