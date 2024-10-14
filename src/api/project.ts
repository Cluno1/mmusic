import request from "./_request";


const baseURL='http://localhost:8091'

// 1获取搜索param接口
function getSearchApi(param) {
  return request({
    url: "/Api/Project/GetList?"+"search="+param,
    method: 'post',
    data:''
  });
}

function getRecommentApi(){
  return request({
    url: 'https://apifoxmock.com/m1/4874726-4530691-default/mmusic/recomment',
    method: 'get',
    data:''
  });
}


// 1获取部门列表接口
function getProjectListApi(data) {
  return request({
    url: "/Api/Project/GetList",
    method: 'post',
    data
  });
}

// 2添加项目接口
function addProjectApi(data) {
  return request({
    url: "/Api/Project/Add",
    method: 'post',
    data
  });
}

// 3删除项目接口
function delProjectApi(data) {
  return request({
    url: "/Api/Project/Add",
    method: 'post',
    data
  });
}

export {
  getSearchApi,getRecommentApi
}