import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import MaterialCard from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import Actions from './components/Actions'

import isEmpty from 'utils/isEmpty'

const useStyles = makeStyles({
  media: {
    height: 200,
  },
  content: {
    textAlign: 'left',
  },
})

const Card = ({
  actions = [],
  className,
  description = null,
  image = null,
  onCardClick = null,
  title,
}) => {
  const classes = useStyles()

  return (
    <MaterialCard className={className}>
      <CardActionArea onClick={onCardClick}>
        {image && <CardMedia className={classes.media} image={image} title={title} />}
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {!isEmpty(actions) && <Actions actions={actions} />}
    </MaterialCard>
  )
}

Card.propTypes = {
  /**
   * The Card's list of actions. The actions can be links or buttons.
   * if you set a 'href', it will be a link, and if you set a 'onClick' it
   * will be a button.
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
  /**
   * The Card's description.
   */
  description: PropTypes.string,
  /**
   * The Card's image media.
   */
  image: PropTypes.string,
  /**
   * Function fired when the card is pressed or cliqued.
   */
  onCardClick: PropTypes.func,
  /**
   * The Card's title.
   */
  title: PropTypes.string.isRequired,
}

export { Card }
export default styled(Card)``
