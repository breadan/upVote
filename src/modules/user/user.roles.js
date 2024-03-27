import systemRoles from '../../../utils/systemRoles.js';

const userRoles = {
  GET_ALL_USERS: [systemRoles.ADMIN],
  ADD_USER: [systemRoles.ADMIN, systemRoles.USER],
};

export default userRoles;
