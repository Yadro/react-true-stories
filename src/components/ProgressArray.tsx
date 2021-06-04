import React from 'react';
import { createUseStyles } from 'react-jss';

interface IProgressArrayProps {
  num: number;
  active: number;
  isPause: boolean;
  duration: number;
}

const ProgressArray: React.FC<IProgressArrayProps> = props => {
  const { num, active } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {new Array(num).fill(true).map((i, index) => (
        <div key={index} className={classes.progressContainer}>
          <div className={classes.progress} />
        </div>
      ))}
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
    animation: '$slideRight 1s linear',
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
