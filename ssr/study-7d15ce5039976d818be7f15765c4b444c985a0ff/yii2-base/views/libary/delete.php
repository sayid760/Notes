<?php
    use yii\helpers\Html;
?>

<?php if($isDel):?>
    <p>删除成功<a href='javascript:history.back();'> 回退</a></p>
<?php else:?>
    <p>删除失败<a href='javascript:history.back();'> 回退</a></p>
<?php endif ?>
