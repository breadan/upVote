import systemRoles from '../../../utils/systemRoles.js';

const productRoles = {
  GET_ALL_PRODUCTS: [systemRoles.ADMIN],
  ADD_PRODUCT: [systemRoles.ADMIN, systemRoles.USER],
  PUT_PRODUCT: [systemRoles.ADMIN, systemRoles.USER],
  DELETE_PRODUCT: [systemRoles.ADMIN],
};

export default productRoles;
