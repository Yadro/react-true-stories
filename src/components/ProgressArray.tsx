import React from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

interface IProgressArrayProps {
  num: number;
  active: number;
  isPause: boolean;
  duration: number;
}

const ProgressArray: React.FC<IProgressArrayProps> = props => {
  const { num, active, isPause, duration } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {new Array(num).fill(true).map((i, index) => {
        const isActive = active === index;
        const isFilled = index < active;
        const isEmpty = index > active;
        return (
          <div key={index} className={classes.progressItemContainer}>
            <div
              className={clsx({
                [classes.progress]: true,
                [classes.progressFilled]: isFilled,
                [classes.animation]: isActive,
                [classes.animationPause]: isActive && isPause,
                [classes.progressEmpty]: isEmpty,
              })}
              style={{ animationDuration: `${duration}ms` }}
            />
          </div>
        );
      })}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    display: 'flex',
    margin: '16px 20px',
  },
  progressItemContainer: {
    flex: 1,
    height: 2,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,.35)',
    '&:first-child': {
      marginLeft: 0,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  progress: {
    height: 2,
    backgroundColor: 'white',
  },
  progressFilled: {
    width: '100%',
  },
  progressEmpty: {
    width: 0,
  },
  animation: {
    animation: '$slideRight linear',
  },
  animationPause: {
    animationPlayState: 'paused',
  },
  '@keyframes slideRight': {
    from: {
      width: 0,
    },
    to: {
      width: '100%',
    },
  },
});

export default ProgressArray;
