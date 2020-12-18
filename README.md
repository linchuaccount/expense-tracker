# 記帳小幫手

簡單好操作的的記帳小幫手，無論是老爸、老媽都可以輕鬆使用

![image](https://github.com/linchuaccount/expense-tracker/blob/master/expense-tracker.png)

## 功能 Features

- 一次瀏覽所有的支出
- 顯示支出總金額
- 可新增一筆支出
- 可修改一筆支出
- 可刪除一筆支出
- 提供五種支出分類
- 可以選擇瀏覽特定分類支出

## 環境需求

node.js v10.15.0  
express v4.17.1  
express-handlebars v5.2.0  
mongoose v5.10.18  
body-parser v1.19.0  
method-override v3.0.0  
nodemom

## 記帳小幫手安裝與執行方法

在終端機輸入以下指令:

1. 下載檔案
   `git clone https://github.com/linchuaccount/expense-tracker.git`
2. 進入專案資料夾
   `cd expense-tracker`
3. 安裝套件
   `npm install`
4. 啟動伺服器
   `npm run dev`
5. 當終端機顯示`App is running on http://localhost:3000`，表示伺服器已成功啟動
6. 在瀏覽器輸入網址`http://localhost:3000`，即可開始使用記帳小幫手

## 常用腳本

啟動伺服器 `npm run dev`  
載入種子資料 `npm run seed`
