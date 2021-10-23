import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import poolFarmChefABI from 'config/abi/poolFarmMasterChef.json'
import multicall from 'utils/multicall'
import { BIG_TEN } from 'utils/bigNumber'
import { getAddress, getPoolMasterChefAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'config/constants/types'
// import { DEFAULT_TOKEN_DECIMAL } from 'config'

const fetchFarms = async (farmsToFetch: FarmConfig[]) => {
  const data = await Promise.all(
    farmsToFetch.map(async (farmConfig) => {
      const lpAddress = getAddress(farmConfig.lpAddresses)
      const calls = [
        // Balance of token in the LP contract
        // {
        //   address: getAddress(farmConfig.token.address),
        //   name: 'balanceOf',
        //   params: [lpAddress],
        // },
        // Balance of quote token on LP contract
        // {
        //   address: getAddress(farmConfig.quoteToken.address),
        //   name: 'balanceOf',
        //   params: [lpAddress],
        // },
        // Balance of LP tokens in the master chef contract
        {
          address: lpAddress,
          name: 'balanceOf',
          params: [getPoolMasterChefAddress()],
        },
        // // Total supply of LP tokens
        // {
        //   address: lpAddress,
        //   name: 'totalSupply',
        // },
        // Token decimals
        // {
        //   address: getAddress(farmConfig.token.address),
        //   name: 'decimals',
        // },
        // Quote token decimals
        {
          address: getAddress(farmConfig.quoteToken.address),
          name: 'decimals',
        },
      ]
      const [quoteTokenBalanceLP, quoteTokenDecimals] =
        await multicall(erc20, calls)

      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      // const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

      // console.log("lpTokenRatio", lpTokenRatio.toString())

      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
        .div(BIG_TEN.pow(quoteTokenDecimals))
        // .times(lpTokenRatio)

      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      // const tokenAmount = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
      // const quoteTokenAmount = new BigNumber(quoteTokenBalanceLP)
        // .div(BIG_TEN.pow(quoteTokenDecimals))
        // .times(lpTokenRatio)

      // const tokenAmountLp = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
      // const quoteTokenAmountLp = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))
      // const tokenPriceVsQuote = quoteTokenAmountLp.div(tokenAmountLp)

      const [info, totalAllocPoint] = await multicall(poolFarmChefABI, [
        {
          address: getPoolMasterChefAddress(),
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: getPoolMasterChefAddress(),
          name: 'totalAllocPoint',
        },
      ])

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...farmConfig,
        // tokenAmount: tokenAmount.toJSON(),
        // quoteTokenAmount: quoteTokenAmount.toJSON(),
        // lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        // tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        // tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
        poolWeight: poolWeight.toJSON(),
        multiplier: `${allocPoint.div(1).toString()}X`,
      }
    }),
  )
  return data
}

export default fetchFarms
