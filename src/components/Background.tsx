import React from 'react';
import { createUseStyles } from 'react-jss';

interface IBackgroundProps {}

const Background: React.FC<IBackgroundProps> = props => {
  const { children } = props;
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

const useStyles = createUseStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000007F',
  },
});

export default Background;
