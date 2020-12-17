import React, { useEffect, useMemo, useState } from 'react'
// import cx from 'classnames'
import './index.css'

/* interface PrizeItem {
  id: string | number
  label?: string
  image?: string
} */

interface TurntableProps {
  type?: 'circle' | 'rectangle'
  duration?: number
  rotate?: number
  mode?: 'auto' | 'css' | 'canvas'
  timingFunction?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
  backgroundImage: string
  // prizes: PrizeItem[]
}

function isTransition() {
  console.log(111, typeof document)
  if (typeof document !== 'object') {
    return false
  }
  if (
    document.body.style.webkitTransition !== undefined ||
    document.body.style.transition !== undefined
  ) {
    return true
  }
  return false
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (e) => {
      reject(e)
    }
  })
}

export const Turntable = React.memo(
  ({
    type = 'circle',
    duration = 5,
    rotate = 5,
    mode = 'auto',
    backgroundImage,
    timingFunction = 'ease-out',
  }: TurntableProps): JSX.Element => {
    const [startStatus, setStarStatus] = useState(0)
    const onStart = () => {
      setStarStatus(rotate)
    }
    const modeActive = useMemo(() => {
      return mode !== 'auto' ? mode : isTransition() ? 'css' : 'canvas'
    }, [mode])

    const styles =
      modeActive === 'css'
        ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: '100%',
            transition: `transform ${duration}s ${timingFunction}`,
            transform: `rotate(${startStatus * 360}deg)`,
          }
        : {}

    // 图片加载
    useEffect(() => {
      if (modeActive === 'canvas') {
        const $canvas = document.getElementById('j-prize') as HTMLCanvasElement
        const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D
        loadImage(backgroundImage).then((img) => {
          ctx.drawImage(img, 0, 0)
        })
      }
    }, [backgroundImage, modeActive])

    return (
      <div className="ac-turntable">
        {modeActive === 'css' ? (
          <div style={styles} className="ac-turntable__prize"></div>
        ) : (
          <div style={styles} className="ac-turntable__prize">
            <canvas id="j-prize"  />
          </div>
        )}

        <div className="ac-turntable__arrow"></div>
        <button onClick={onStart}>开始</button>
      </div>
    )
  }
)
