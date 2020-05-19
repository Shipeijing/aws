
export default {

    namespace: 'Index',
  
    state: {
        start:true
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },
    },
  
    reducers: {
      setStart(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  