shuaxin();

//下拉菜单
getAjax('/manager/category/findAllCategory','GET',null,function (res) {
    //console.log(res);
    var $opt = '';
    $(res.data).each(function (index,item) {
        $opt += `<option value="" data-id="`+item.id+`">`+item.name+`</option>`;
    });
    $('#zx-xiala').html($opt);
},function (error) {
    //console.log(error)
});
//改变下拉菜单
$('#zx-xiala').click(function (e) {
    if(e.target.nodeName === 'OPTION'){
        //console.log($(e.target).data('id'));
        $categoryId = $(e.target).data('id');
        $.ajax({
            url:'http://134.175.154.93:8099/manager/article/findArticle',
            method:'GET',
            //携带参数
            data:{
                page:0,
                pageSize:100,
                categoryId:$categoryId
            },
            success: function (res) {
                var $str = '';
                $(res.data.list).each(function (index, item) {
                    $str += '<tr>';
                    $str += `<td><input type="checkbox" value="`+item.id+`"></td>
								                <td>`+item.title+`</td>
								                <td>`+item.category.name+`</td>
								                <td>`+item.liststyle+`</td>
								                <td>`+null+`</td>
								                <td>`+item.publishtime+`</td>
								                <td>`+item.readtimes+`</td>
								                <td>
                                                     <i class="fa fa-edit" aria-hidden="true" title="编辑" data-id="`+item.id+`"></i>
                                                     <i class="fa fa-trash-o" aria-hidden="true" title="删除" data-id="`+item.id+`"></i>
                                                </td>`;
                    $str += '</tr>';


                });
                //console.log($str);
                $('.table2').html($str);
                //console.log(1,res.data.list);
            },
            error: function (error) {
                //console.log(error);
            }
        });
    }
});
function shuaxin(){
    $.ajax({
        url:'http://134.175.154.93:8099/manager/article/findArticle',
        method:'GET',
        //携带参数
        data:{
            page:0,
            pageSize:100,
            categoryId:7868
        },
        success: function (res) {
            var $str = '';
            $(res.data.list).each(function (index, item) {
                $str += '<tr>';
                $str += `<td><input type="checkbox" value="`+item.id+`"></td>
								                <td>`+item.title+`</td>
								                <td id="cateId">`+item.category.name+`</td>
								                <td>`+item.liststyle+`</td>
								                <td>`+null+`</td>
								                <td>`+item.publishtime+`</td>
								                <td>`+item.readtimes+`</td>
								                <td>
                                                     <i class="fa fa-edit bianji" aria-hidden="true" title="编辑" data-id="`+item.id+`" data-content="`+item.category.comment+`" data-cid="`+item.category.id+`"></i>
                                                     <i class="fa fa-trash-o shanchu" aria-hidden="true" title="删除" data-id="`+item.id+`"></i>
                                                </td>`;
                $str += '</tr>';
                //console.log(item.category.id);
            });
            $('.table2').html($str);
            //console.log(res.data.list);

            //单个删除
            /*$('.shanchu').click(function (e) {
                var $id = $(e.target).data('id');
                $.ajax({
                    url:'http://134.175.154.93:8099/manager/article/deleteArticleById',
                    method:'GET',
                    //携带参数
                    data:{
                        id:$id
                    },
                    success: function (res) {
                        shuaxin();
                       alert('删除成功');
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            });*/


            //修改
            /* $('.bianji').click(function (e) {
                 $('#to-save1').addClass('xiugai3').removeClass('xinzeng3');
                 $('.zx .modal-title').text('修改资讯');
                 var $title = e.target.parentNode.parentNode.childNodes[2].childNodes[0].data;
                 var $lanmu = e.target.parentNode.parentNode.childNodes[4].childNodes[0].data;
                 var $style = e.target.parentNode.parentNode.childNodes[6].childNodes[0].data;
                 var $content = $(e.target).data('content');
                 var $id = $('.bianji').data('id');
                 var $cId = $('.bianji').data('cid');
                 console.log($cId);
                 $('.modal [value='+$style+']').prop('checked',true);
                 $('.modal [id=biaoti]').val($title);
                 $('.xiala2').text($lanmu);
                 $('#zhengwen').text($content);
                 $('#myModal3').modal('show');
                 $('.xiugai3').click(function () {
                     var $title = $('.modal [id=biaoti]').val();
                     var $style = $('.modal input:checked:checked').val();
                     var $content = $('#zhengwen').val();
                     var $time = getFormatDate();
                     var $obj = {
                         title:$title,
                         liststyle:$style,
                         categoryId:$cId,
                         content:$content,
                         id:$id,
                         publishtime:$time,
                         readtimes:0
                     };
                     console.log($obj)
                     $.ajax({
                         url:'http://134.175.154.93:8099/manager/article/saveOrUpdateArticle',
                         method:'POST',
                         data:$obj,
                         success: function (res) {
                             $('.modal-backdrop').addClass('hide');
                             $('#myModal3').modal('hide');
                             shuaxin();
                             console.log(1,res)
                         },
                         error: function (error) {
                             console.log(2,error)
                         }
                     });
                 })
             })*/
        },
        error: function (error) {
            console.log(error);
        }
    });
}
//修改
$('body').on('click','.bianji',function (e) {
    $('#to-save1').addClass('xiugai3').removeClass('xinzeng3');
    $('.zx .modal-title').text('修改资讯');
    var $title = e.target.parentNode.parentNode.childNodes[2].childNodes[0].data;
    var $lanmu = e.target.parentNode.parentNode.childNodes[4].childNodes[0].data;
    var $style = e.target.parentNode.parentNode.childNodes[6].childNodes[0].data;
    var $content = $(e.target).data('content');
    var $id = $('.bianji').data('id');
    var $cId = $('.bianji').data('cid');
    console.log($cId);
    $('.modal [value='+$style+']').prop('checked',true);
    $('.modal [id=biaoti]').val($title);
    $('.xiala2').text($lanmu);
    $('#zhengwen').text($content);
    $('#myModal3').modal('show');
    $('.xiugai3').click(function () {
        var $title = $('.modal [id=biaoti]').val();
        var $style = $('.modal input:checked:checked').val();
        var $content = $('#zhengwen').val();
        var $time = getFormatDate();
        var $obj = {
            title:$title,
            liststyle:$style,
            categoryId:$cId,
            content:$content,
            id:$id,
            publishtime:$time,
            readtimes:0
        };
        console.log($obj)
        $.ajax({
            url:'http://134.175.154.93:8099/manager/article/saveOrUpdateArticle',
            method:'POST',
            data:$obj,
            success: function (res) {
                $('.modal-backdrop').addClass('hide');
                $('#myModal3').modal('hide');
                shuaxin();
                console.log(1,res)
            },
            error: function (error) {
                console.log(2,error)
            }
        });
    })
});

//单个删除
$('body').on('click','.shanchu',function (e) {
    var $id = $(e.target).data('id');
    $.ajax({
        url:'http://134.175.154.93:8099/manager/article/deleteArticleById',
        method:'GET',
        //携带参数
        data:{
            id:$id
        },
        success: function (res) {
            shuaxin();
            alert('删除成功');
            $('.modal-backdrop').addClass('hide');
        },
        error: function (error) {
            console.log(error);
        }
    });
});

//新增
$('#zx-add').click(function () {
    $('#to-save1').removeClass('xiugai3').addClass('xinzeng3');
    $('.zx .modal-title').text('新增资讯');
    //清空
    $('.modal [id=biaoti],#zhengwen').val(null);
    $('.modal [type=radio]').prop('checked',false);
    $('.xiala2').text('请选择');
    getAjax('/manager/category/findAllCategory','GET',null,function (res) {
        //console.log(res);
        var $li = '';
        $(res.data).each(function (index,item) {
            $li += `<li><a href="#" data-id="`+item.id+`">`+item.name+`</a></li>`
        });
        $('#zx-lanmu').html($li);
    },function (error) {
        console.log(error)
    });
    $('#myModal3').modal('show');
    $('.xialakuang2').click(function (e) {
        //获取pid
        $pId = $(e.target).data('id');
        $('.xiala2').text($(e.target).text());
    });

    $('.xinzeng3').click(function () {
        var $title = $('.modal [id=biaoti]').val();
        var $style = $('.modal input:checked:checked').val();
        var $content = $('#zhengwen').val();
        var $obj = {
            title:$title,
            liststyle:$style,
            categoryId:$pId,
            content:$content
        };
        $.ajax({
            url:'http://134.175.154.93:8099/manager/article/saveOrUpdateArticle',
            method:'POST',
            data:$obj,
            success: function (res) {
                shuaxin();
                //console.log(1,res)
            },
            error: function (error) {
                console.log(error)
            }
        });
        $('#myModal3').modal('hide');
    })

});

//批量删除
$('#zx-plsc').click(function () {
    console.log(123);
    var inputs = document.getElementsByTagName('input');
    inputs = Array.prototype.slice.call(inputs,0);
    var ids = inputs.filter(function(item){
        return item.checked;
    }).map(function(item){
        return item.value;
    });
    ids.pop();
    $.ajax({
        url:'http://134.175.154.93:8099/manager/article/batchDeleteArticle',
        method:'POST',
        data:{ids:ids.join()},
        success: function (res) {
            shuaxin();
            console.log(1,res)
        },
        error: function (error) {
            console.log(2,error)
        }
    });
});

//时间
function getFormatDate(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}