import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: "BEE-USDT LP",
    lpAddresses: {
      56: "",
      97: "0x11bb71a5f6D08D699e3f4fc4417d875bA9A212d1",
      128: "0xc4B87BbCC0689fF4ca2d367bDDdbA6775AFD6cf7",
      256: ""
    },
    token: tokens.bee,
    quoteToken: tokens.usdt
  },
  {
    pid: 1,
    lpSymbol: "1inch-USDT LP",
    lpAddresses: {
      56: "",
      97: "0x0de6f0E018A2A532B129377dEB9FF2D292B7cDEC",
      128: "0xBe1e7dfAaa7a8F801d4345d63fB7507157eCf165",
      256: ""
    },
    token: tokens['1inch'],
    quoteToken: tokens.usdt
  },
  {
    pid: 2,
    lpSymbol: "ETH-USDT LP",
    lpAddresses: {
      56: "",
      97: "0x3E729787c08087A88751153eFC927C6676C6d1c9",
      128: "0xdf15d9beF25e299BF29a596A99735F1CD0D09074",
      256: ""
    },
    token: tokens.eth,
    quoteToken: tokens.usdt
  },
  // {
  //   pid: 2,
  //   lpSymbol: "WHT-USDT LP",
  //   lpAddresses: {
  //       56: "",
  //       97: "",
  //       128: "0xe0ED1775855A275B555d2Cd7c861c9c876B03947",
  //       256: ""
  //   },
  //   token: tokens.wht,
  //   quoteToken: tokens.usdt
  // },
  // {
  //   pid: 3,
  //   lpSymbol: "HUSD-USDT LP",
  //   lpAddresses: {
  //       56: "",
  //       97: "",
  //       128: "0x61891Fd9F41DB2d90Bd690d439f55f426edc10ef",
  //       256: ""
  //   },
  //   token: tokens.husd,
  //   quoteToken: tokens.usdt
  // },
]

export default farms
