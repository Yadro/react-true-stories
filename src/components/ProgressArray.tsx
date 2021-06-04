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
  const { num, active, isPause } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {new Array(num).fill(true).map((i, index) => {
        const isActive = active === index;
        const isFilled = index < active;
        const isEmpty = index > active;
        return (
          <div key={index} className={classes.progressContainer}>
            <div
              className={clsx({
                [classes.progress]: true,
                [classes.progressFilled]: isFilled,
                [classes.animation]: isActive,
                [classes.animationPause]: isActive && isPause,
                [classes.progressEmpty]: isEmpty,
              })}
            />
          </div>
        );
      })}
    </div>
  );
};

const useStyles = createUseStyles({
  root: {
    // position: 'absolute',
    display: 'flex',
  },
  progressContainer: {
    flex: 1,
    height: 2,
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
    animation: '$slideRight 10s linear',
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
