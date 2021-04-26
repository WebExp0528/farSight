/**
 * Get Status from Date String
 *
 * @param {string} date
 * @returns
 */
export const getStatus = date => {
  const dueDate = new Date(date);
  const today = new Date();
  let statusMessage = 'Unknown';

  if (dueDate > today) {
    statusMessage = 'On Time';
  }
  if (dueDate === today) {
    statusMessage = 'Due Today';
  }
  if (dueDate < today) {
    statusMessage = 'Past Due';
  }
  return statusMessage;
};
