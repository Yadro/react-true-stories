import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { IStory, Size } from '../types/StoryProps';
import Background from './Background';
import ProgressArray from './ProgressArray';

interface IStoryProps {
  stories: IStory[];
  size: Size;
}

interface IStyleProps extends Size {}

const Story: React.FC<IStoryProps> = props => {
  const { stories, size } = props;
  const classes = useStyles(size);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);

  const handlePause = () => {
    console.log('handlePause');
    setPause(true);
  };

  const handlePlay = () => {
    console.log('handlePlay');
    setPause(false);
  };

  const changeIndex = (move: -1 | 1) => () => {
    const newIndex = activeIndex + move;

    if (newIndex < 0 || newIndex > stories.length - 1) {
      return;
    }

    setActiveIndex(activeIndex + move);
  };

  return (
    <div className={classes.root}>
      <Background>
        <button onClick={changeIndex(-1)}>{'<'}</button>
        <div>
          <ProgressArray num={stories.length} active={activeIndex} duration={1000} isPause={pause} />
          <img
            key={activeIndex}
            src={stories[activeIndex]?.url}
            className={classes.image}
            onTouchStart={handlePause}
            onMouseDown={handlePause}
            onTouchEnd={handlePlay}
            onMouseUp={handlePlay}
          />
        </div>
        <button onClick={changeIndex(1)}>{'>'}</button>
      </Background>
    </div>
  );
};

const useStyles = createUseStyles({
  root: {},
  image: (props: IStyleProps) => ({
    height: props.height,
    width: props.width,
    objectFit: 'cover',
  }),
});

export default Story;
