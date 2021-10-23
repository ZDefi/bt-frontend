import React, { lazy } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchPublicData, useFetchPriceList } from 'state/hooks'
import styled from 'styled-components'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import Pools from './views/Pools'
import history from './routerHistory'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
// const PoolFarms = lazy(() => import('./views/PoolFarms'))
// const ILO = lazy(() => import('./views/ILO'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Collectibles = lazy(() => import('./views/Collectibles'))
// const Teams = lazy(() => import('./views/Teams'))
// const Team = lazy(() => import('./views/Teams/Team'))
// const Profile = lazy(() => import('./views/Profile'))
// const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
// const Predictions = lazy(() => import('./views/Predictions'))
const Info = lazy(() => import('./views/Info'))
const Invitation = lazy(() => import('./views/Invitation'))
// const Bottles = lazy(() => import('./views/Bottles'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const StyleBg = styled.div`
  /* background: linear-gradient(180deg, #ffffff 0%, #f0f8fe 100%);
  background: url('/images/bg.png'); */
`

const App: React.FC = () => {
  useEagerConnect()
  useFetchPublicData()
  // useFetchProfile()
  useFetchPriceList()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <StyleBg>
        <Menu>
          {/* <SuspenseWithChunkError fallback={<PageLoader />}> */}
          <SuspenseWithChunkError fallback={null}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/farms">
                <Farms />
              </Route>
              {/* <Route path="/pools">
                <PoolFarms />
              </Route> */}
              <Route path="/pools">
                <Pools />
              </Route>
              <Route path="/info">
                <Info />
              </Route>
              <Route path="/invitation">
                <Invitation />
              </Route>
              {/* <Route path="/bottles">
                <Bottles />
              </Route> */}
              {/* <Route path="/ilo">
                <ILO />
              </Route> */}
              {/* <Route path="/lottery">
                <Lottery />
              </Route> */}
              {/* <Route path="/ifo">
                <Ifos />
              </Route> */}
              {/* <Route path="/nfb">
                <Collectibles />
              </Route> */}
              {/* <Route exact path="/teams">
                <Teams />
              </Route>
              <Route path="/teams/:id">
                <Team />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route> */}
              {/* <Route path="/competition">
              <TradingCompetition />
            </Route>
            <Route path="/prediction">
              <Predictions />
            </Route> */}
              {/* Redirect */}
              {/* <Route path="/staking">
                <Redirect to="/pools" />
              </Route>
              <Route path="/syrup">
                <Redirect to="/pools" />
              </Route> */}
              <Route path="/nft">
                <Redirect to="/nfb" />
              </Route>
              {/* 404 */}
              <Route component={NotFound} />
            </Switch>
          </SuspenseWithChunkError>
        </Menu>
      </StyleBg>
      <EasterEgg iterations={2} />
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
