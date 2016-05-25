export const _itemEvents {
  ADD: 'ADD_ITEMS',
  CREATE: 'CREATE_ITEM',
  UPDATE: 'UPDATE_ITEM',
  DELETE: 'DELETE_ITEM',
  SELECT: 'SELECT_ITEM'
};

export const _items = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'ADD_ITEMS':
      return payload;
    case 'CREATE_ITEM':
      return [...state, payload];
    case 'UPDATE_ITEM':
      return state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_ITEM':
      return state.filter(item => {
        return item.id !== payload.id;
      });
    default:
      return state;
  }
};

export const _selectedItem = (state: any = null, {type, payload}) => {
  switch (type) {
    case 'SELECT_ITEM':
      return payload;
    default:
      return state;
  }
};
