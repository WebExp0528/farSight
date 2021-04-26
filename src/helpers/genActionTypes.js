/**
 * Generate Default Action Types
 * @param {string} action
 */
export const genActionTypes = action => {
  return {
    NAME: `@${action}`,
    GET: `@${action}/GET`,
    CREATE: `@${action}/CREATE`,
    UPDATE: `@${action}/UPDATE`,
    DELETE: `@${action}/DELETE`
  };
};
