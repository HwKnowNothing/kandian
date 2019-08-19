
getAllCategory();
$('.lanmu').on('click',getAllCategory);
//查询 单个删除
function getAllCategory() {
    getAjax('/manager/category/findAllCategory','get',null,function (res) {
        var $str = '';
        $(res.data).each(function (index, item) {
            if(item.parent){
                $str += '<tr>';
                $str += `<td><input type="checkbox" value="`+item.id+`"></td>
								                <td>`+item.name+`</td>
								                <td>`+item.comment+`</td>
								                <td>`+item.parent.name+`</td>
								                <td>
                                                     <i class="fa fa-edit" aria-hidden="true" title="编辑" data-id="`+item.id+`"></i>
                                                     <i class="fa fa-trash-o" aria-hidden="true" title="删除" data-id="`+item.id+`"></i>
                                                </td>`;
                $str += '</tr>';
            }else{
                $str += '<tr>';
                $str += `<td><input type="checkbox" value="`+item.id+`"></td>
								                <td>`+item.name+`</td>
								                <td>`+item.comment+`</td>
								                <td>`+null+`</td>
								                <td>
                                                     <i class="fa fa-edit" aria-hidden="true" title="编辑" data-id="`+item.id+`"></i>
                                                     <i class="fa fa-trash-o" aria-hidden="true" title="删除" data-id="`+item.id+`"></i>
                                                </td>`;
                $str += '</tr>';
            }
            $('.table1').html($str);
        })
    },function (error) {
        console.log(error)
    })
}
//单个删除函数
function deleteCategoryById(num) {
    getAjax('/manager/category/deleteCategoryById','get',num,function (res) {
        console.log(11,res);
        getAllCategory();
    },function (error) {
        console.log(22,error)
    })
}
//新增
$('#lm-add').click(function () {
    $('.hidden-bianji').removeClass('hidden');
    $('.try1').addClass('hidden');
    $('.modal-title').text('新增栏目');
    $('.modal [id=id],.modal [id=name],.modal [id=comment]').val(null);
    var $li = '';
    $.ajax({
        url:'http://134.175.154.93:8099/manager/category/findAllCategory',
        method:'GET',
        success: function (res) {
            //点击新增时为下拉框添加父栏目选项
           $(res.data).each(function (index, item) {
               $li += `<li class="text-left"><a href="#" data-id="`+item.id+`">`+item.name+`</a></li>`;
           });
           $('.xialakuang').html($li);
        },
        error: function (error) {
            console.log(error)
        }
    });
    $('#myModal').modal('show');
    var $pId = 0;
    $('.xialakuang').click(function (e) {
        //获取pid
        $pId = $(e.target).data('id');
        $('.xiala').text($(e.target).text());
    });

    $('#to-save').click(function () {
        //console.log('add')
        var $name = $('.modal [id=name]').val();
        var $comment = $('.modal [id=comment]').val();
        //console.log($pId,$name,$comment);
        $.ajax({
            url:'http://134.175.154.93:8099/manager/category/saveOrUpdateCategory',
            method:'POST',
            data:{
                name:$name,
                comment:$comment,
                parentId:$pId
            },
            success: function (res) {
               getAllCategory();
                console.log(res)
            },
            error: function (error) {
                console.log(error)
            }
        });
        $('#myModal').modal('hide');
    })
});

//批量删除
$('#lm-plsc').click(function () {
    //修改模态框的样式
    $('.title2').text('请确认');
    $('.body2').text('是否删除选中项');
    $('#myModal2').modal('show');

    //console.log($('.lm input'))
    //获取要删除的id
    /*var ids = $('.lm input').filter(function (index, item) {
            return item.checked;
    }).map(function (index,item) {
        return $(item).val();
    });*/
    var inputs = document.getElementsByTagName('input');
    inputs = Array.prototype.slice.call(inputs,0);
    var ids = inputs.filter(function(item){
        return item.checked;
    }).map(function(item){
        return item.value;
    });
    console.log(ids);
    $('#to-delete').click(function () {
            $.ajax({
                url:'http://134.175.154.93:8099/manager/category/batchDeleteCategory',
                method:'POST',
                data:{ids:ids.join()},
                success: function (res) {
                    getAllCategory();
                    console.log(res)
                },
                error: function (error) {
                    console.log(error)
                }
            });
            $('#myModal2').modal('hide');
    })

});

//单个删除
$('body').on('click','i[title=删除]',function (e) {
    var $cateName = e.target.parentNode.parentNode.childNodes[2].childNodes[0].data;
    var $str = '是否删除:'+ $cateName;
    var $id = $(e.target).data('id');
    //console.log($id,'点击删除按钮获取id');
    //var $target = {id:$id};
    //console.log($target,'将要传递的参数');
    $('.title2').text('请确认');
    $('.body2').html($str);
    $('#myModal2').modal('show');
    $('#to-delete').click(function () {
        //console.log($target,'点击确认删除时确认参数');
        deleteCategoryById($id);
        $('#myModal2').modal('hide');
    })
});

//修改
$('body').on('click','i[title=编辑]',function (e) {
    var $cateName = e.target.parentNode.parentNode.childNodes[2].childNodes[0].data;
    var $id = $(e.target).data('id');
    var $comment = e.target.parentNode.parentNode.childNodes[4].childNodes[0].data;
    $('.modal-title').text('修改栏目');
    $('.try1').removeClass('hidden');
    $('.modal [id=id]').val($id);
    $('.modal [id=name]').val($cateName);
    $('.modal [id=comment]').val($comment);
    //$('.hidden-bianji').addClass('hidden');
    $('#myModal').modal('show');
    $('#to-save').click(function () {
        //console.log('xiugai');
        var $name = $('.modal [id=name]').val();
        var $comment = $('.modal [id=comment]').val();
        //console.log($name,$comment,$id);
        $.ajax({
            url:'http://134.175.154.93:8099/manager/category/saveOrUpdateCategory',
            method:'POST',
            data:{
                name:$name,
                comment:$comment,
                id:$id
            },
            success: function (res) {
                getAllCategory();
                console.log(res)
            },
            error: function (error) {
                console.log(error)
            }
        });
        $('#myModal').modal('hide');
    })
})



