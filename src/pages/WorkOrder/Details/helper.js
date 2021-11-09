/**
 * Get WonID
 *
 * @param {*} props
 * @returns
 */
export const getWonID = props => {
  return props?.match?.params?.won || null;
};

export const getBidItem = props => {
  return props?.match?.params?.bidItem || null;
};
