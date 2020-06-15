import React, { forwardRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Zoom, FabProps } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import ArrowUpward from './components/ArrowUpward'
import Button from './components/Button'

import { isServerSide, serverDocument } from '../../utils'

/**
 *
 * API:
 *
 * - [BackToTop API](https://components-extra.netlify.app/components/back-to-top)
 * - inherits [Fab API](https://material-ui.com/api/fab/)
 */
const BackToTop = forwardRef((props: FabProps, ref: React.Ref<HTMLButtonElement>) => {
  const {
    mixins: { backToTop },
    transitions,
  } = useTheme()
  const [display, setDisplay] = useState(false)
  const { body, documentElement } = isServerSide() ? serverDocument : document

  const transitionDuration = {
    enter: transitions.duration.enteringScreen,
    exit: transitions.duration.leavingScreen,
  }

  useEffect(() => {
    const { startHeight } = backToTop
    const onScroll = (): void => {
      if (body.scrollTop > startHeight || documentElement.scrollTop > startHeight) {
        setDisplay(true)
      } else {
        setDisplay(false)
      }
    }

    document.addEventListener('scroll', onScroll)
    return (): void => document.removeEventListener('scroll', onScroll)
  }, [body.scrollTop, documentElement.scrollTop, backToTop])

  const scrollToTop = (): void =>
    documentElement && documentElement.scrollIntoView({ behavior: 'smooth' })

  return (
    <Zoom
      in={display}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${display ? transitionDuration.exit : 0}ms`,
      }}
    >
      <Button
        aria-label="Back to top"
        data-testid="back-to-top-button"
        color="primary"
        onClick={scrollToTop}
        ref={ref}
        {...props}
      >
        <ArrowUpward />
      </Button>
    </Zoom>
  )
})

BackToTop.displayName = 'BackToTop'

export { BackToTop as BaseBackToTop }
export default styled(BackToTop)``
