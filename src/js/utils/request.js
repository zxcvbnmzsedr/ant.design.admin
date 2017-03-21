const Ajax = require('robe-ajax')

export default function request (url, options) {
  url = "http://localhost:8081"+url
  if (options.cross) {
    return Ajax.getJSON('http://query.yahooapis.com/v1/public/yql', {
      q: "select * from json where url='" + url + '?' + Ajax.param(options.data) + "'",
      format: 'json'
    })
  } else {
    return Ajax.ajax({
        contentType: 'application/json; charset=utf-8',
      url: url,
      method: options.method || 'get',
      data: options.data || {},
      processData: options.method === 'get',
      dataType: 'JSON'
    }).done((data) => {
        console.log(data);
      return data
    })
  }
}
