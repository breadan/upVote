import systemRoles from '../../../utils/systemRoles.js';

const likeRoles = {
  GET_ALL_LIKES: [systemRoles.ADMIN, systemRoles.USER],
  ADD_LIKES: [systemRoles.USER],
};

export default likeRoles;
