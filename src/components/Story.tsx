import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { IStory, Size } from '../types/StoryProps';
import Background from './Background';
import ProgressArray from './ProgressArray';

interface IStoryProps {
  stories: IStory[];
  size: Size;
}

interface IStyleProps extends Size {}

const defaultDurationMs = 5 * 1000;

const Story: React.FC<IStoryProps> = props => {
  const { stories, size } = props;
  const classes = useStyles(size);
  const storiesAmount = stories.length;

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);
  const timer = useRef<number>();
  const playStartTime = useRef<number>();
  const saveProgressTime = useRef<number>();
  const restProgressTime = useRef<number>();

  const changeActiveSlide = useCallback(
    (move: -1 | 1) => {
      setActiveSlide(activeSlide => {
        const newIndex = activeSlide + move;

        if (newIndex < 0 || newIndex > storiesAmount - 1) {
          return activeSlide;
        }

        return newIndex;
      });
    },
    [storiesAmount],
  );

  const startTimer = useCallback(
    // passing the current activeSlide to keep the it up to date
    (activeSlide: number, delayMs?: number) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      if (activeSlide < storiesAmount) {
        const delay = delayMs || defaultDurationMs;

        playStartTime.current = new Date().getTime();
        restProgressTime.current = delay;

        timer.current = window.setTimeout(() => {
          if (activeSlide < storiesAmount) {
            changeActiveSlide(1);
            startTimer(activeSlide + 1);
          }
        }, delay);
      }
    },
    [changeActiveSlide, storiesAmount],
  );

  const changeActiveSlideWithSideEffect = useCallback(
    (move: -1 | 1) => () => {
      const newIndex = activeSlide + move;

      if (newIndex < 0 || newIndex > storiesAmount - 1) {
        return;
      }

      setActiveSlide(newIndex);
      startTimer(newIndex);
    },
    [activeSlide, storiesAmount, startTimer],
  );

  useEffect(() => {
    startTimer(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePause = () => {
    setPause(true);

    saveProgressTime.current = new Date().getTime() - playStartTime.current;
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const handlePlay = () => {
    setPause(false);

    startTimer(activeSlide, restProgressTime.current - saveProgressTime.current);
  };

  return (
    <div className={classes.root}>
      <Background>
        <button onClick={changeActiveSlideWithSideEffect(-1)}>{'<'}</button>
        <div className={classes.imageContainer}>
          <ProgressArray num={stories.length} active={activeSlide} duration={defaultDurationMs} isPause={pause} />
          <img
            key={activeSlide}
            src={stories[activeSlide]?.url}
            className={classes.image}
            onTouchStart={handlePause}
            onMouseDown={handlePause}
            onTouchEnd={handlePlay}
            onMouseUp={handlePlay}
          />
        </div>
        <button onClick={changeActiveSlideWithSideEffect(1)}>{'>'}</button>
      </Background>
    </div>
  );
};

const useStyles = createUseStyles({
  root: {},
  imageContainer: {
    position: 'relative',
  },
  image: (props: IStyleProps) => ({
    height: props.height,
    width: props.width,
    objectFit: 'cover',
  }),
});

export default Story;
