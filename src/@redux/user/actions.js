export const set = info => ({
  type: '@user/CREATE',
  payload: {
    ...info
  }
});
