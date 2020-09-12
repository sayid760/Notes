<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\db\ActiveRecord;

class Book extends ActiveRecord {

    public $id;
    public $bookname;
    public $price;
    public $author;
    public $num;
    public $createTime;
    public $deleteTime;
    public $delAct;

    public const SCENARIO_CREATE = 'addBook';
    public const SCENARIO_EDIT = 'editBook';
    public const SCENARIO_LOOK = 'lookBook';

    public function scenarios() {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_CREATE] = ['bookname','price','author','num'];
        $scenarios[self::SCENARIO_EDIT] = ['bookname','price','author','num'];
        $scenarios[self::SCENARIO_LOOK] = ['id','bookname','price','author','num','createTime','deleteTime','delAct'];
        return $scenarios;
    }

    public function attributeLabels() {
        return [
            'id' => \Yii::t('app', '编号'),
            'bookname' => \Yii::t('app', '书名字'),
            'price' => \Yii::t('app', '价格'),
            'author' => \Yii::t('app', '作者'),
            'num' => \Yii::t('app', '数量'),
            'createTime' => \Yii::t('app', '入库时间'),
        ];
    }
}