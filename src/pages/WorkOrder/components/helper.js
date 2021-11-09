export const getItemStatus = item => {
  let dueDate = new Date(item.due_date);
  let today = new Date();
  let statusMessage = 'Unknown';
  if (item.approval_status === 'Pre-Pending' || item.approval_status === 'Pending') {
    statusMessage = 'Pending';
    return statusMessage;
  }
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

export const getItemStatusBadgeClass = item => {
  let status = getItemStatus(item);
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
      break;
  }

  return itemClass;
};
