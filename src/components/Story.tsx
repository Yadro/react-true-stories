import React from 'react';
import { createUseStyles } from 'react-jss';

interface IStoryProps {}

const Story: React.FC<IStoryProps> = () => {
  const classes = useStyles();

  return <div className={classes.root}>Component</div>;
};

const useStyles = createUseStyles({
  root: {},
});

export default Story;
