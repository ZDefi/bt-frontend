import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import iloMasterchefABI from 'config/abi/iloMasterchef.json'
import swapFactoryABI from 'config/abi/swapFactory.json'
import multicall from 'utils/multicall'
import { BIG_TEN } from 'utils/bigNumber'
import { getAddress, getIloMasterChefAddress, getSwapFactoryAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'config/constants/types'
import { DEFAULT_TOKEN_DECIMAL } from 'config'

interface IloConfig extends FarmConfig {
  isHavePair?: boolean
}

const fetchFarms = async (farmsToFetch: IloConfig[]) => {
  const data = await Promise.all(
    farmsToFetch.map(async (farmConfig) => {
      const lpAddress = getAddress(farmConfig.lpAddresses)
      const [lpPairs] = await multicall(swapFactoryABI, [
        {
          address: getSwapFactoryAddress(),
          name: 'getPair',
          params: [getAddress(farmConfig.token.address), getAddress(farmConfig.quoteToken.address)],
        },
      ])
      let calls = []
      if (lpPairs[0] === lpAddress) {
        calls = [
          // Balance of token in the LP contract
          {
            address: getAddress(farmConfig.token.address),
            name: 'balanceOf',
            params: [lpAddress],
          },
          // Balance of quote token on LP contract
          {
            address: getAddress(farmConfig.quoteToken.address),
            name: 'balanceOf',
            params: [lpAddress],
          },
          // Balance of LP tokens in the master chef contract
          {
            address: lpAddress,
            name: 'balanceOf',
            params: [getIloMasterChefAddress()],
          },
          // Total supply of LP tokens
          {
            address: lpAddress,
            name: 'totalSupply',
          },
          // Token decimals
          {
            address: getAddress(farmConfig.token.address),
            name: 'decimals',
          },
          // Quote token decimals
          {
            address: getAddress(farmConfig.quoteToken.address),
            name: 'decimals',
          },
        ]
      } else {
        calls = [
          // Balance of token in the LP contract
          {
            address: getAddress(farmConfig.token.address),
            name: 'balanceOf',
            params: [lpAddress],
          },
          // Balance of quote token on LP contract
          {
            address: getAddress(farmConfig.quoteToken.address),
            name: 'balanceOf',
            params: [lpAddress],
          },
          // Balance of LP tokens in the master chef contract
          {
            address: getAddress(farmConfig.token.address),
            name: 'balanceOf',
            params: [getIloMasterChefAddress()],
          },
          // Total supply of LP tokens
          {
            address: getAddress(farmConfig.quoteToken.address),
            name: 'totalSupply',
          },
          // Token decimals
          {
            address: getAddress(farmConfig.token.address),
            name: 'decimals',
          },
          // Quote token decimals
          {
            address: getAddress(farmConfig.quoteToken.address),
            name: 'decimals',
          },
        ]
      }
      const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC, lpTotalSupply, tokenDecimals, quoteTokenDecimals] =
        await multicall(erc20, calls)

      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      let lpTokenRatio = new BigNumber(0)
      if (lpPairs[0] === lpAddress) {
        lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
      }

      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
        .div(DEFAULT_TOKEN_DECIMAL)
        .times(new BigNumber(2))
        .times(lpTokenRatio)

      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      const tokenAmount = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals)).times(lpTokenRatio)
      const quoteTokenAmount = new BigNumber(quoteTokenBalanceLP)
        .div(BIG_TEN.pow(quoteTokenDecimals))
        .times(lpTokenRatio)

      const tokenAmountLp = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))
      const quoteTokenAmountLp = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))
      const tokenPriceVsQuote = quoteTokenAmountLp.div(tokenAmountLp)

      const [startBlock, endBlock, info, totalAllocPoint] = await multicall(iloMasterchefABI, [
        {
          address: getIloMasterChefAddress(),
          name: 'startBlock',
        },
        {
          address: getIloMasterChefAddress(),
          name: 'endBlock',
        },
        {
          address: getIloMasterChefAddress(),
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: getIloMasterChefAddress(),
          name: 'totalAllocPoint',
        },
      ])

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...farmConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        // tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
        poolWeight: poolWeight.toJSON(),
        multiplier: `${allocPoint.div(1000).toString()}X`,
        startBlock: startBlock.toString(),
        endBlock: endBlock.toString(),
        isHavePair: lpPairs[0] === lpAddress,
      }
    }),
  )
  return data
}

export default fetchFarms
