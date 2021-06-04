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

  const [pause, setPause] = useState<boolean>(false);

  const handlePause = () => {
    console.log('handlePause');
    setPause(true);
  };

  const handlePlay = () => {
    console.log('handlePlay');
    setPause(false);
  };

  return (
    <div className={classes.root}>
      <Background>
        <div>
          <ProgressArray num={stories.length} active={0} duration={1000} isPause={pause} />
          {stories.map((story, index) => (
            <img
              key={index}
              src={story.url}
              className={classes.image}
              onTouchStart={handlePause}
              onMouseDown={handlePause}
              onTouchEnd={handlePlay}
              onMouseUp={handlePlay}
            />
          ))}
        </div>
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
