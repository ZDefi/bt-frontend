import BigNumber from 'bignumber.js'
import nftTokenAbi from 'config/abi/nftToken.json'
import multicall from 'utils/multicall'
import { getNftTokenAddress } from 'utils/addressHelpers'

// 获取NFB授权情况
const fetchNftUserAllowances = async (tokenIds) => {
  // const nftFarmAddress = getNftFarmAddress()

  // 获取nft721合约地址
  const calls = tokenIds.map(nft => {
    const nftTokenAddress = getNftTokenAddress()
    return { address: nftTokenAddress, name: 'getApproved', params: [nft.tokenId] }
  })

  const rawLpAllowances = await multicall(nftTokenAbi, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export default fetchNftUserAllowances
