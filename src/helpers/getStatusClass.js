import { getStatus } from './getStatus';

/**
 * Get Status ClassName from Date string
 *
 * @param {string} date
 */
export const getStatusClass = date => {
  let status = getStatus(date);
  let itemClass = 'primary';
  switch (status) {
    case 'On Time':
      itemClass = 'success';
      break;
    case 'Due Today':
      itemClass = 'warning';
      break;
    case 'Past Due':
      itemClass = 'danger';
      break;
    default:
      itemClass = 'secondary';
  }

  return itemClass;
};
