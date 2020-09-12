<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\Book;
use ErrorException;
use mysqli;
use yii\data\Pagination;

class LibaryController extends Controller {
    public $layout = "libary";
    public $enableCsrfValidation=false;
    /**
     * Displays homepage.
     * @return string
     */
    public function actionIndex()
    {
        $query = Yii::$app->db->createCommand('select * from book order by id')->query();
        $len = $query->count();
        $pagination = new Pagination([
            'defaultPageSize'=>5,
            'totalCount' => $len
        ]);
        
        $books = array();
        foreach ($query as $k => $v ){
            $book = new Book(['scenario'=>'lookBook']);
            $book->attributes = $v;
            $book['delAct'] = "javascript:window.toDel('http://{$_SERVER['HTTP_HOST']}/index.php?r=libary/delete&id={$book->id}')";
            // $book['delAct'] = "javascript:windows.toDel(http://{$_SERVER['HTTP_HOST']}/index.php?r=libary/edit&id={$book->id})";
            array_push($books,$book);
        }

        $pages = array();
        $pageOffset = $pagination->getPage() * $pagination->pageSize;
        $pageCount = ($pagination->getPage() + 1) * $pagination->pageSize;
        for($i = $pageOffset; $i < $pageCount; $i++) {
            if($books[$i]) {
                array_push($pages,$books[$i]);
            }
        }

        return $this->render('index',[
            'books'=>$pages,
            'pagination'=>$pagination,
        ]);
    }

    public function actionDelete($id) {
        $sql_cmd = "delete from book where id=$id";
        $query = Yii::$app->db->createCommand($sql_cmd)->query();
        $isDel = $query > 0 ? true : false;
        return $this->render('delete',[
            'isDel'=>$isDel
        ]);
    }

    public function actionTodb() {
        $id = \Yii::$app->request->post("id", '');
        $bookname = \Yii::$app->request->post("bookname", '');
        $price = \Yii::$app->request->post("price", '');
        $author = \Yii::$app->request->post("author", '');
        $isEdit = \Yii::$app->request->post("isEdit", '');
        $sql_cmd = "";
        if($isEdit == true) {
            $sql_cmd = "select count(*) from book where bookname = '{$bookname}'";
            $count = Yii::$app->db->createCommand($sql_cmd)->query();
            if($count > 0) {
                $sql_cmd = "update book set bookname='{$bookname}',price={$price},author='{$author}' where id={$id}";
                $update_count = Yii::$app->db->createCommand($sql_cmd)->execute();
                if($update_count > 0) {
                    return json_encode(['status' => true]);
                }
            }
        }
        else {
            $sql_cmd = "INSERT INTO `book`(`bookname`, `price`, `author`, `num`, `createTime`, `deleteTime`)  VALUES('{$bookname}',{$price},'{$author}',99999,NOW(),NULL);";
            $insert_count = Yii::$app->db->createCommand($sql_cmd)->execute();
            if($insert_count > 0) {
                return json_encode(['status' => true]);
            }
            else {
                echo $insert_count;
            }
        }
        return json_encode(['status' => false]);
    }

    public function actionEdit($id) {
        $query = Yii::$app->db->createCommand("select * from book where id={$id}")->query();
        $book = null;
        foreach ($query as $k => $v ){
            $book = new Book(['scenario'=>'lookBook']);
            $book->attributes = $v;
            break;
        }
        return $this->render('edit',['book'=>$book]);
    }

    public function actionAdd() {
        return $this->render('add');
    }
}
