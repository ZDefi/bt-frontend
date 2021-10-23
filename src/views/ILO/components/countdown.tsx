import React, { useState, useEffect, useRef } from 'react'

interface IProps {
  timeStamp: any
}

const CountDown = (props: IProps) => {
  const { timeStamp } = props
  const intervalRef = useRef<any>(null)

  const now: any = Math.round(new Date().getTime() / 1000).toString() // 获取当前时间
  const end: any = timeStamp // 设置截止时间

  const [leftTime, setLeftTime] = useState(end - now) // 时间间隔
  // const [d, setDays] = useState<any>("") // 小时
  const [h, setHours] = useState<any>('00') // 小时
  const [m, setMinutes] = useState<any>('00') // 分钟
  const [s, setSeconds] = useState<any>('00') // 秒

  useEffect(() => {
    if (leftTime > 0) {
      intervalRef.current = setInterval(() => {
        const newNow: any = Math.round(new Date().getTime() / 1000).toString() //  重新获取当前时间

        const newLeftTime = timeStamp - newNow
        setLeftTime(() => newLeftTime) // 计算新的时间间隔数值

        // const days = Math.floor(newLeftTime / 60 / 60 / 24 % 7) < 10 ? `0${Math.floor(newLeftTime / 60 / 60 % 24)}` : Math.floor(newLeftTime / 60 / 60 % 24);
        const hours =
          Math.floor((newLeftTime / 60 / 60) % 24) < 10
            ? `0${Math.floor((newLeftTime / 60 / 60) % 24)}`
            : Math.floor((newLeftTime / 60 / 60) % 24)
        const minutes =
          Math.floor((newLeftTime / 60) % 60) < 10
            ? `0${Math.floor((newLeftTime / 60) % 60)}`
            : Math.floor((newLeftTime / 60) % 60)
        const seconds =
          Math.floor(newLeftTime % 60) < 10 ? `0${Math.floor(newLeftTime % 60)}` : Math.floor(newLeftTime % 60)
        // setDays(() => days)  // 函数写法 设置小时
        setHours(() => hours) // 函数写法 设置小时
        setMinutes(() => minutes) // 函数写法 设置分钟
        setSeconds(() => seconds) // 函数写法保证值在setInterval里更新，避免useEffect的bug
      }, 1000)
    } else {
      setLeftTime(0)
      setHours(0)
      setMinutes(0)
      setSeconds(0)
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 不传依赖

  return (
    <>
      {leftTime <= 0 && <span>-</span>}
      {leftTime > 0 && <span>{`${h}:${m}:${s}`}</span>}
    </>
  )
}

export default CountDown
