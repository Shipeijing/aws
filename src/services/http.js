import request from '../utils/request';

export default {
  login(data) {
    return request('/crm/v1/corpus_manage/login', 'POST', data);
  },
  startTesting(data) {
    return request('/crm/v1/aws_outbound_details/startTesting', 'POST', data);
  },
  next(data) {
    return request('/crm/v1/aws_outbound_details/next', 'GET', data);
  },
  reset(data) {
    return request('/crm/v1/aws_outbound_details/reset', 'GET', data);
  },
  complete(data) {
    return request('/crm/v1/aws_outbound_details/complete', 'GET', data);
  }
}
