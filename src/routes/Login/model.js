import request from '../../services/http'
import { routerRedux } from 'dva/router';
import { message } from "antd";
export default {
  namespace: "Login",

  state: {
    phoneArea: "Singapore",
    visible: true,
    btnText: 6,
  },

  subscriptions: {
    setup({ dispatch, history, put }) {
    },
  },

  effects: {
    *loginIn({ payload }, { call, put }) {
      const result = yield call(request.login, payload)
      if (!result.data.corpusTaskId) {
        message.error('You entered the wrong code')
        return false
      } else {
        yield put({ type: 'Store/setUser', payload: { user: result.data } })
        message.success('login successful')
        yield put(routerRedux.push('/'));
        return true
      }
    },
  },

  reducers: {
    setvisible(state, action) {
      return { ...state, ...action.payload };
    },
    setbtnText(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
