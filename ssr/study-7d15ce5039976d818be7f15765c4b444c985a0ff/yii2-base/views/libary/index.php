<?php

use app\widgets\Alert;
use yii\bootstrap\Button;
use yii\grid\ActionColumn;
use yii\grid\GridView;
use yii\helpers\Html;
use yii\widgets\LinkPager;

$this->title = 'libary';
$this->params['breadcrumbs'][] = $this->title;

?>

<script type="text/javascript">
    window.toDel = function(url) {
        if(confirm('确定要删除么?')) {
           window.location.href = url;
        }
    }
</script>


<div class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading"><?= Html::encode($this->title) ?></div>
    <!-- Table -->
    <table class="table">
        <tr>
            <th>编号</th>
            <th>图书名称</th>
            <th>价格</th>
            <th>作者</th>
            <th>入库日期</th>
            <th>操作</th>
        </tr>
        <?php foreach ($books as $book) : ?>
            <tr>
                <td><?= Html::encode("{$book->id}") ?></td>
                <td><?= Html::encode("{$book->bookname}") ?></td>
                <td><?= Html::encode("{$book->price}") ?></td>
                <td><?= Html::encode("{$book->author}") ?></td>
                <td><?= Html::encode("{$book->createTime}") ?></td>
                <td><?= Html::a('编辑', "http://{$_SERVER['HTTP_HOST']}/index.php?r=libary/edit&id={$book->id}", [
                            'class' => 'btn btn-primary',
                            'role' => 'button',
                            'name' => 'login-button',
                        ])
                        ?>
                    <?= Html::a('删除', "{$book->delAct}", [
                            'class' => 'btn btn-primary',
                            'role' => 'button',
                            'name' => 'login-button',
                        ])
                        ?>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</div>
<?= LinkPager::widget(['pagination' => $pagination]) ?>