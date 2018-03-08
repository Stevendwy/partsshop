'use strict'

let u = {
  /**
   * 
   * @param {Object} obj 需要删除的元素
   * @param {Object} resource 删除数据源
   * @param {String} key 参考key
   */
  remove: function (obj, resource, key) {
    if (resource instanceof Array) {
      for (let i = 0, j = resource.length; i < j; i++) {
        let item = resource[i]
        let same = false
        if (key) same = item[key] === obj[key]
        else same = item === obj

        if (same) {
          resource.splice(i, 1)
          break
        }
      }
    }
    return resource
  },
  mum: document.querySelector('#mum'),
  showMum: function () {
    this.mum.style.display = 'block'
  },
  closeMum: function () {
    this.mum.style.display = 'none'
  },
  get: function (path, data, payload) {
    return this.request('get', path, data, payload)
  },
  post: function (path, data, payload) {
    return this.request('post', path, data, payload)
  },
  delete: function (path, data, payload) {
    return this.request('delete', path, data, payload)
  },
  request: function (method, path, data, payload) {
    // let host = 'http://www.yhcqp.com' 测试数据错误情况下强制修正
    let host = ''
    let url = host + path

    return (
      axios.request({
        url: url,
        data: data,
        method: method,
        params: data
      })
        .then(function (res) {
          let rData = res.data || {}
          if (typeof (rData) !== 'object') rData = JSON.parse(rData)

          if (rData.code === 1) return rData
          else if (rData.code === 2) {
            location.href = "/login"
          }
          else {
            return Promise.reject(rData.msg)
          }
        })
        .catch(function (err) {
          alert(err)
          return null
        })
    )
  }
}
