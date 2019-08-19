/*
* 用户管理
* */
//获取信息
var state = {
    // 当前页数
    currentPage:1,
    // 每页条数
    pageSize:10,
    // 总页数
    totalPage:0,
    // 表格数据
    tableData:[],
    // 表格总数据
    tableTotalData:[],
    // 新增或者修改操作类型
    option:'新增',
    // 当前修改的对象
    currentObj:{},
};
//查找
function getAllUser() {
    state.tableData = [];
    getAjax('/manager/user/findAllUser','GET',null,function (res) {
        state.tableData = res.data;
        console.log(state.tableData);
        console.log(res.data);
        addTableDOM();
    })
}
getAllUser();
//加DOM节点
function addTableDOM() {
    var str = '';
    state.tableData.forEach(function (value) {
        str += `<div class="usertable">
                            <div class="btn btn-danger yh-delete-btn" date-id="`+value.id+`">X</div>
                            <div class="img">
                                <img src="./images/touxiang.png" alt="">
                            </div>
                            <div class="detail">
                                <p>用户名:<span>`+value.username+`</span></p>
                                <p>真实姓名:<span>`+value.nickname+`</span></p>
                                <p>注册时间:<span>`+value.regTime+`</span></p>
                                <p>email:<span>`+value.email+`</span></p>
                                <p>状态:<button date-state="`+value.enabled+`" class="btn btn-success state-btn" date-id="`+value.id+`" title="状态">状态</button></p>
                            </div>
                        </div>`;
        $('.yh .row').html(str);
    });
    /*console.log($('.state-btn'));
    console.log($('.state-btn').attr('date-state'));*/
    $('.state-btn').map(function (index,item) {
        //console.log(item);
        if($(item).attr('date-state') === 'true'){
            //console.log($(item).attr('date-state'));
            $(item).text('on').addClass('btn-success').removeClass('btn-danger');
        }else {
            //console.log($(item).attr('date-state'));
            $(item).removeClass('btn-success').addClass('btn-danger').text('off')
        }
    })

}
//切换状态
$('body').on('click','[title=状态]',function () {
   var state = $(this).attr('date-state');
   if(state === 'true'){
       state = false;
   }else {
       state = true;
   }
    console.log(state);
   var id = Number($(this).attr('date-id'));
   console.log(id);
   var obj = {
       id:id,
       status:state
   };
   console.log(obj);
    $.ajax({
        url:'http://134.175.154.93:8099/manager/user/changeStatus',
        method:'POST',
        data:obj,
        success: function (res) {
            if(state === 'false'){
                $(this).removeClass('btn-success').addClass('btn-danger').text('off');
                getAllUser()
            }else {
                $(this).text('on').addClass('btn-success').removeClass('btn-danger');
                getAllUser()
            }
        },
        error: function (error) {
            console.log(error)
        }
    });
});

//添加
$('#yh-add').click(function () {
    //清空
    $('#yh-name').val(null);
    $('#yh-password').val(null);
    $('#yh-reaname').val(null);
    $('#yh-email').val(null);
    $('#myModal4').modal('show');
    //点击时发送请求
    $('#yh-save').click(function () {
        $username = $('#yh-name').val();
        $password = $('#yh-password').val();
        $nickname = $('#yh-reaname').val();
        $email = $('#yh-email').val();
        var obj = {
            username:$username,
            password:$password,
            nickname:$nickname,
            email:$email
        };
        console.log(obj);
        $('#myModal4').modal('hide');
        $.ajax({
            url:'http://134.175.154.93:8099/manager/user/saveOrUpdateUser',
            method:'POST',
            data:obj,
            success: function (res) {
                getAllUser();
            },
            error: function (error) {
                console.log(error)
            }
        });
    })
});

//删除
$('body').on('click','.yh-delete-btn',function () {
    //console.log($(this).attr('date-id'));
    var id = $(this).attr('date-id');
    $.ajax({
        url:'http://134.175.154.93:8099/manager/user/deleteUserById',
        method:'GET',
        //携带参数
        data:{id:id},
        success: function (res) {
            alert('删除成功');
            getAllUser();
            console.log(1,res);
        },
        error: function (error) {
            console.log(2,error);
        }
    });
});