import React from 'react'
import { Turntable } from '../../components'
import { RouteComponentProps } from '@reach/router'

const TurntablePage = React.memo(
  (props: RouteComponentProps): JSX.Element => {
    return (
      <main>
        <Turntable time={6} rotate={6} />
      </main>
    )
  }
)

export default TurntablePage
