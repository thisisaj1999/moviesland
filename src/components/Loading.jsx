import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function LoadingSpinner() {
  const props = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    config: { duration: 1000 },
  });

  return (
    <animated.div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: props.rotate.interpolate((r) => `rotate(${r}deg)`),
      }}
    >
      <FontAwesomeIcon icon={faSpinner} color="#f9d3b4" size="2xl" />
    </animated.div>
  );
}

export default LoadingSpinner;
