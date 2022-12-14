import { useEffect, useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'

export interface IPlayer {
  id: string
  name: string
  money: number
}

const getFromLocalStorage = (): IPlayer[] => {
  let Result: IPlayer[] = []
  try {
    const players = JSON.parse(localStorage.getItem('players') as string)
    if (players) Result = players
  } catch (error) {}
  return Result
}

export function useGame() {
  const isFirst = useRef(true)
  const [players, setPlayers] = useState<IPlayer[]>([])

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      setPlayers(getFromLocalStorage())
    } else {
      localStorage.setItem('players', JSON.stringify(players))
    }
  }, [players])

  const addPlayer = ({ name, money }: { name: string, money: number }) => setPlayers([...players, { id: uuid(), name, money }])
  const deletePlayer = (id: string) => setPlayers(players.filter(p => p.id !== id))
  const addMoney = (id: string, value: number) => {
    setPlayers(
      players.map(player => {
        if (player.id === id) {
          player.money += value
          return player
        }
        return player
      })
    )
  }
  const transfer = ({ senderId, receiverId, amount }: { senderId: string, receiverId: string, amount: number }) => {
    setPlayers(
      players.map(player => {
        switch (player.id) {
          case senderId: {
            player.money -= amount
            return player
          }
          case receiverId: {
            player.money += amount
            return player
          }
          default:
            return player
        }
      })
    )
  }
  const charge = ({ chargedId, receiverId, amount }: { chargedId: string, receiverId: string, amount: number }) => {
    setPlayers(
      players.map(player => {
        switch (player.id) {
          case chargedId: {
            player.money -= amount
            return player
          }
          case receiverId: {
            player.money += amount
            return player
          }
          default:
            return player
        }
      })
    )
  }

  return {
    players,
    addPlayer,
    deletePlayer,
    addMoney,
    transfer,
    charge
  }
}
