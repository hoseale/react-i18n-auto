import request from 'utils/request';

export default class Serv {

  static getData(data) {
    return request({
      url: 'hello',
      method: 'GET'
    })
  }

};