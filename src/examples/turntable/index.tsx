import React from 'react'
import { Turntable } from '../../components'
import { RouteComponentProps } from '@reach/router'

const TurntablePage = React.memo(
  (props: RouteComponentProps): JSX.Element => {
    return (
      <main>
        <Turntable
          mode="canvas"
          backgroundImage="https://cdn.jsdelivr.net/gh/ZhelinCheng/storage@master/picture/wR5hSB_44.png"
        />
      </main>
    )
  }
)

export default TurntablePage
