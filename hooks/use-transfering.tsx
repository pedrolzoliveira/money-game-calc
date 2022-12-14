import { useEffect, useState } from 'react'
import { useGame } from './use-game'

export function useTransfering(game: ReturnType<typeof useGame>) {
  const [receiverId, setReceiverId] = useState<string>()
  const [senderId, setSenderId] = useState<string>()
  const [amount, setAmount] = useState<number>()

  const zerarValores = () => {
    setReceiverId(undefined)
    setSenderId(undefined)
    setAmount(undefined)
  }

  useEffect(() => {
    if (
      receiverId &&
      senderId &&
      amount
    ) {
      game.transfer({
        receiverId,
        senderId,
        amount
      })
      zerarValores()
    }
  }, [receiverId, senderId, amount])

  return {
    senderId,
    setSenderId,
    receiverId,
    setReceiverId,
    amount,
    setAmount,
    zerarValores
  }
}
