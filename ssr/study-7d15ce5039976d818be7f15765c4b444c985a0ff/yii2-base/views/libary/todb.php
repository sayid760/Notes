<?php
    use yii\helpers\Html;
    $this->title = 'result';
    $this->params['breadcrumbs'][] = $this->title;
?>
<!-- /libary/index -->
<?php if($isError):?>
    <p>数据库操作失败<a href='/libary/index'> 回退</a></p>
<?php elseif($isUpdate):?>
    <p>更新成功<a href='/libary/index'> 回退</a></p>
<?php else:?>
    <p>添加成功<a href='/libary/index'> 回退</a></p>
<?php endif ?>
