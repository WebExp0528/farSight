import React from 'react';

/**
 * Check scrollable
 *
 * @param {Function} action
 */
export const useShowScroll = action => {
  React.useEffect(() => {
    if (document.body.scrollHeight > window.innerHeight) {
      action();
    }
  }, [document.body.scrollHeight, window.innerHeight]);
};
