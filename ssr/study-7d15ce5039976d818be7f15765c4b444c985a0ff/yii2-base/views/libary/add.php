<?php

use yii\helpers\Html;

$this->title = 'add';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="panel panel-default">
    <div class="panel-heading"><?= Html::encode($this->title) ?></div>
    <form method="post" style="padding:10px" action='/index.php?r=libary/todb'>
        <label class="control-label" for="inputSuccess2">图书名:</label>
        <?= Html::input('text',null,$book->bookname,[
            'id'=>'bookname',
            'class'=>"form-control",
            'placeholder'=>'图书名'
        ])?>
        <p></p>
        <label class="control-label" for="inputSuccess2">作者:</label>
        <?= Html::input('text',null,$book->author,[
            'id'=>'author',
            'class'=>"form-control",
            'placeholder'=>'作者'
        ])?>
        <p></p>
        <label class="control-label" for="inputSuccess2">价格:</label>
        <?= Html::input('number',null,$book->price,[
            'id'=>'price',
            'class'=>"form-control",
            'placeholder'=>'价格',
            'min'=>'1',
        ])?>
        <p></p>
        <a class="btn btn-primary" href="javascript:edit()">提交</a>
        <a class="btn btn-primary" href="/index.php">返回</a>
    </form>
</div>

<script type="text/javascript">
    function edit() {
        if (confirm("确定要添加么")) {
            let bookname = document.getElementById('bookname').value;
            let author = document.getElementById('author').value;
            let price = document.getElementById('price').value;
            $.ajax({
                url: "index.php?r=libary/todb",
                type: 'post',
                data: {
                    "id":0,
                    "bookname": bookname,
                    "author": author,
                    "price": price,
                },
                dataType: 'json',
                async: false,
                success: function(data) {
                    if (data.status) {
                        alert('成功');
                        window.location.href = "/index.php";
                    }
                    else {
                        alert("失败");
                    }
                },
                error: function() {
                    alert("根本没有传过去");
                }
            });
        }
    }
</script>