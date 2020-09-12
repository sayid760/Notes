import jsonp from '../common/js/jsonp';
import { commonParams, options } from './config';
import axios from 'axios';

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  });
  return jsonp(url, data, options);
}

export function getDiscList() {
  const url = 'api/getDiscList';
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 19,
    notice: 0,
    picmid: 1,
    sortId: 0,
    format: 'json',
    categoryId: 10000000

  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  })
}