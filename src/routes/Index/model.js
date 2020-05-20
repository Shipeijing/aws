import request from '../../services/http'
import { routerRedux } from 'dva/router';
import {
  message
} from 'antd';
export default {

  namespace: 'Index',

  state: {
    id: null,
    start: false,
    num: 0,
    visible: false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/')
          dispatch({ type: 'reset' })
      })
    },
  },

  effects: {
    *loginOut({ payload }, { call, put }) {  // eslint-disable-line
      sessionStorage.clear()
      yield put(routerRedux.push('/Login'));
    },
    *getNum({ payload }, { call, put }) {
      const result = yield call(request.next, payload)
      if (result.data) {
        yield put({ type: 'setNum', payload: { num: Number(payload.currentPosition) } })
      } else {
        message.error('Operation failed, please try again!')
      }
    },
    *getStart({ payload }, { call, put }) {
      const result = yield call(request.startTesting, payload)
      if (result.data.id) {
        message.success('Testing has begun successfully')
        if (payload.callType === '0') {
          yield put({ type: 'setId', payload: { id: result.data.id } })
          yield put({ type: 'setStart', payload: { start: true } })
        }
      } else {
        message.error(result.data.message)
      }
    },
    *getReset({ payload }, { call, put }) {
      const result = yield call(request.reset, payload)
      if (result.data) {

      } else {
        message.error('Operation failed, please try again!')
      }
    },
    *getPrompt({ payload }, { call, put }) {
      const result = yield call(request.complete, payload)
      if (result.data) {

      } else {
        message.error('Operation failed, please try again!')
      }

    },
  },

  reducers: {
    reset(state, action) {
      let data = {}
      data.id = Number(sessionStorage.getItem('id')) || null
      data.num = Number(sessionStorage.getItem('num')) || 0
      data.start = Boolean(sessionStorage.getItem('start'))
      data.visible = Boolean(sessionStorage.getItem('visible'))
      return { ...state, ...data };
    },
    setId(state, action) {
      sessionStorage.setItem('id', action.payload.id)
      return { ...state, ...action.payload };
    },
    setStart(state, action) {
      sessionStorage.setItem('start', action.payload.start)
      return { ...state, ...action.payload };
    },
    setVisible(state, action) {
      sessionStorage.setItem('visible', action.payload.visible)
      return { ...state, ...action.payload };
    },
    setNum(state, action) {
      sessionStorage.setItem('num', action.payload.num)
      return { ...state, ...action.payload };
    },
  },

};
