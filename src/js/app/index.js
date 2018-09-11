require('../../css/index.scss');

var instance = axios.create({
  baseURL: '/',
  timeout: 15000
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

const getQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
      return unescape(r[2]);
  }
  return null;
}

$(function () {

  const service = {
    getEntity(albumId) {
      return instance({
        url: `/itings/buyAlbum/album?albumId=${albumId}`,
        method: 'get'
      })
    }
  }

  const data = {
    albumId: getQueryString('albumId'),
    albumDetial: {},
    information: $('.information'),
    anchor: $('.anchor'),
    adaptPeople: $('.adapt-people'),
    receive: $('.receive')
  }


  const mounted = () => {
    methods.init()
  }

  const methods = {
    async init () {
      await this.fetchEntity()
      this.handleHtml()
    },
    handleHtml () {
      data.information.html('暂无')
      data.anchor.html('暂无')
      data.adaptPeople.html('暂无')
      data.receive.html('暂无')
      if (data && data.albumDetial.buyAlbumTextAndImgDTOList instanceof Array && data.albumDetial.buyAlbumTextAndImgDTOList.length !== 0) {
        const arr = data.albumDetial.buyAlbumTextAndImgDTOList
        data.information.html(arr[0].introductionText)
        data.anchor.html(arr[1].introductionText)
        data.adaptPeople.html(arr[2].introductionText)
        data.receive.html(arr[3].introductionText)
      }
    },
    async fetchEntity() {
      if (data.albumId === undefined || data.albumId === null) {
        return
      }
      await service.getEntity(data.albumId).then(response => {
        if (response.code === 200) {
          data.albumDetial = JSON.parse(JSON.stringify(response.data))
        }
      })
    }
  }

  mounted()
});