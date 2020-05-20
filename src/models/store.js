import { routerRedux } from 'dva/router';
export default {

  namespace: 'Store',

  state: {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/')
          dispatch({ type: 'watchUrl', payload: dispatch })
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    watchUrl(state, action) {
      if (state.user === null) {
        action.payload(routerRedux.push('/Login'))
      }
      return { ...state };
    },
    setUser(state, action) {
      sessionStorage.setItem('user', JSON.stringify(action.payload.user))
      return { ...state, ...action.payload };
    },
  },

};
