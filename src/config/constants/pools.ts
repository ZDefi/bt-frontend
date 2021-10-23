import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0, // pool chef
    stakingToken: tokens.bee,
    earningToken: tokens.bee,
    contractAddress: {
      97: '0x28e534590904b288E5Cb27FfBA27f3Cd8ee2eb62',
      56: '0xdfAa0e08e357dB0153927C7EaBB492d1F60aC730',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '4',
    sortOrder: 1,
    isFinished: false,
    pid: 0
  },
  {
    sousId: 1,
    stakingToken: tokens.bee,
    earningToken: tokens.usdc,
    contractAddress: {
      97: '0x8a85eC3cc7FE7BFef55136CAc1FE15966Df1d20b',
      56: '0xdfAa0e08e357dB0153927C7EaBB492d1F60aC730',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.1',
    sortOrder: 1,
    isFinished: false,
    pid: 1
  }
]

export default pools
