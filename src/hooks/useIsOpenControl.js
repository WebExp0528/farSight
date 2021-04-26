import { useState } from 'react';

/**
 * Open State React Hooks
 *
 * @param {boolean} defaultState
 * @returns
 */
export const useIsOpenControls = (defaultState = false) => {
  const [isVisible, setVisibility] = useState(defaultState);

  const handleClose = () => setVisibility(false);
  const handleOpen = () => setVisibility(true);
  const handleToggle = () => setVisibility(!isVisible);

  return {
    isVisible,
    setVisibility,
    handleClose,
    handleOpen,
    handleToggle,
    isOpen: isVisible
  };
};
