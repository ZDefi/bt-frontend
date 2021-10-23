import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { ethers } from 'ethers'
import { BIG_TEN, BIG_ZERO } from './bigNumber'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  // if (pid === 0) {
  //   return masterChefContract.methods
  //     .enterStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
  //     .send({ from: account, gas: 200000 })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // }

  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: 500000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const stakeIlo = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: 200000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: 1000000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, gas: 200000, value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  // if (pid === 0) {
  //   return masterChefContract.methods
  //     .leaveStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
  //     .send({ from: account, gas: 200000 })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // }

  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: 500000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const unstakeIlo = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .withdraw(pid)
    .send({ from: account, gas: 200000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const unIloStake = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .withdraw(pid)
    .send({ from: account, gas: 200000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: 2000000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  // if (pid === 0) {
  //   return masterChefContract.methods
  //     .leaveStaking('0')
  //     .send({ from: account, gas: 200000 })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // }

  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account, gas: 500000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const harvestIlo = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account, gas: 200000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account, gas: 2000000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, gas: 200000, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// NFB
// nfb Stake ALl
export const nfbStakeAll = async (nftFarmContract, account, tokenIds, ids) => {
  return nftFarmContract.methods
    .stakeAll(tokenIds, ids)
    .send({ from: account, gas: 1000000 * tokenIds.length, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
// nfb Stake
export const nfbStake = async (nftFarmContract, account, tokenId, id) => {
  return nftFarmContract.methods
    .stake(tokenId, id)
    .send({ from: account, gas: 1000000, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// nfb Stake ALl
export const nfbUnstakeAll = async (nftFarmContract, account, tokenIds) => {
  return nftFarmContract.methods
    .unstakeAll(tokenIds)
    .send({ from: account, gas: 1000000 * tokenIds.length, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
// nfb Stake
export const nfbUnstake = async (nftFarmContract, account, tokenId) => {
  return nftFarmContract.methods
    .unstake(tokenId)
    .send({ from: account, gas: 1000000, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// nfb Clim
export const nfbClaim = async (nftFarmContract, account) => {
  return nftFarmContract.methods
    .claim(account)
    .send({ from: account, gas: 1000000, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// nfb Clim
export const stakeVdr = async (flyNodeContract, account, amount) => {
  return flyNodeContract.methods
    .stakeVdr( new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: 1000000, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
