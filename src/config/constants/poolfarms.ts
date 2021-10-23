import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
    {
        pid: 0,
        lpSymbol: "BEE",
        lpAddresses: {
            56: "",
            97: "0xcAe09ad2049B1a87ce0396613cB3a2acA65aF6Ef",
            128: "0x0cE3A2b99608dBfEAF85A3333118CB4607963265",
            256: ""
        },
        token: tokens.bee,
        quoteToken: tokens.bee
    },
    {
        pid: 1,
        lpSymbol: "USDT",
        lpAddresses: {
            56: "",
            97: "0xc421EE10b4760DA47621698FeF7933377709950D",
            128: "0xdb821c6d5a76f6c91C077827Fbd162670B0A105E",
            256: ""
        },
        token: tokens.bee,
        quoteToken: tokens.usdt
    }
]

export default farms
