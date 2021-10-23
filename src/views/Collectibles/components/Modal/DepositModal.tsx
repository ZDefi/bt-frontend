import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, LinkExternal } from '@pancakeswap/uikit'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { getIdByTokenId } from 'utils/getNfbBabyOfTokens'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (tokenIds: number [], ids: number []) => void
  onDismiss?: () => void
  refresh: () => void
  tokenName?: string
  addLiquidityUrl?: string
  ids: number []
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, ids, refresh, tokenName = '', addLiquidityUrl }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, 0)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const checkIds = useMemo<number []>(() => {
    return ids.slice(0,Number(val)).map(d => getIdByTokenId(d))
  }, [val, ids])

  const checkTokenIds = useMemo<number []>(() => {
    return ids.slice(0, Number(val))
  }, [val, ids])

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={t('Stake NFB')} onDismiss={onDismiss}>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
        inputTitle={t('Stake')}
      />
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx}>
          {t('Cancel')}
        </Button>
        <Button
          width="100%"
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          onClick={async () => {
            try {
              setPendingTx(true)
              await onConfirm(checkTokenIds, checkIds)
              refresh()
              setPendingTx(false)
              onDismiss()
            } catch (error) {
              setPendingTx(false)
            }
          }}
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
      </ModalActions>
      <LinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
        {t('Get')} {tokenName}
      </LinkExternal>
    </Modal>
  )
}

export default DepositModal
