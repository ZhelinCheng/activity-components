import React, { useState } from 'react'
// import cx from 'classnames'
import './index.css'

/* interface PrizeItem {
  id: string | number
  label?: string
  image?: string
} */

interface TurntableProps {
  type?: 'circle' | 'rectangle'
  time: number
  rotate: number
  // prizes: PrizeItem[]
}

export const Turntable = React.memo(
  ({ type = 'circle', time, rotate }: TurntableProps): JSX.Element => {
    const [startStatus, setStarStatus] = useState(0)
    const onStart = () => {
      setStarStatus(rotate)
    }

    return (
      <div className="ac-turntable">
        <div
          style={{
            transition: `transform ${time}s ease-out`,
            transform: `rotate(${startStatus * 360}deg)`,
          }}
          className="ac-turntable__prize"
        ></div>
        <div className="ac-turntable__arrow"></div>
        <button onClick={onStart}>开始</button>
      </div>
    )
  }
)
