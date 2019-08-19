// ajax 的封装
var baseUrl = 'http://134.175.154.93:8099';
function getAjax(url,method,data,successFun,errorFun){
    if(method=='get'&&data){
        var myUrl = baseUrl+url+'?id='+data;
    }else {
        myUrl = baseUrl+url
    }
    $.ajax({
        url:myUrl,
        method:method,
        date:data,
        success:successFun,
        error:errorFun
    })
}

