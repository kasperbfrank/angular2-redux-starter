export const _userEvents = {
  ADD: 'ADD_USERS',
  CREATE: 'CREATE_USER',
  UPDATE: 'UPDATE_USER',
  REMOVE: 'DELETE_USER',
  SELECT: 'SELECT_USER'
};

export const _users = (state: any = [], { type, payload }) => {
  switch (type) {
    case _userEvents.ADD:
      return payload;
    case _userEvents.CREATE:
      return [...state, payload];
    case _userEvents.UPDATE:
      return state.map(data => {
        return data.id === payload.id ? Object.assign({}, data, payload) : data;
      });
    case _userEvents.REMOVE:
      return state.filter(data => { return data.id !== payload.id; });
    default:
      return state;
  }
};

export const _selectedUser = (state: any = [], { type, payload }) => {
  switch (type) {
    case _userEvents.SELECT:
      return payload;
    default:
      return state;
  }
};
