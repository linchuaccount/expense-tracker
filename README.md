# 記帳小幫手

簡單好操作的的記帳小幫手，無論是老爸、老媽都可以輕鬆使用

![image](https://github.com/linchuaccount/expense-tracker/blob/master/loginPage.png)
![image](https://github.com/linchuaccount/expense-tracker/blob/master/registerPage.PNG)
![image](https://github.com/linchuaccount/expense-tracker/blob/master/expense.PNG)

## 功能 Features

- 可以註冊帳號
- 可以FB登入(未實裝)
- 註冊帳號後可以email和密碼登入
- 一次瀏覽所有的支出
- 可新增一筆支出
- 可修改一筆支出
- 可刪除一筆支出
- 可以記錄支出名稱、日期、金額、支出分類和店家名稱
- 提供五種支出分類
- 可以選擇瀏覽特定分類支出
- 可以選擇瀏覽特定月份支出
- 可根據選擇類別顯示支出總金額

## 環境需求

需在本地安裝 node.js (本專案使用node.js版本為 v10.15.0)  
以下為專案使用的npm套件  
express v4.17.1  
express-handlebars v5.2.0  
mongoose v5.10.18  
body-parser v1.19.0  
method-override v3.0.0  
express-session v1.17.1  
passport v0.4.1  
passport-local v1.0.0  
passport-facebook v3.0.0  
connect-flash v0.1.1  
bcryptjs v2.4.3  
dotenv v8.2.0  
nodemom  

## Heroku 連結

[https://secure-lake-82803.herokuapp.com/users/login](https://secure-lake-82803.herokuapp.com/users/login)  
可用以下帳號密碼登入
```
email: user1@example  
password: 12345678  
```

## 記帳小幫手本地電腦安裝與執行方法

在終端機輸入以下指令:

1. 下載檔案
   `git clone https://github.com/linchuaccount/expense-tracker.git`
2. 進入專案資料夾
   `cd expense-tracker`
3. 安裝套件
   `npm install`
4. 請自行新增`.env`檔案，參數設定可參考專案資料夾內的`.env.example`
5. 啟動伺服器
   `npm run dev`
6. 當終端機顯示`App is running on http://localhost:3000`，表示伺服器已成功啟動
7. 在瀏覽器輸入網址`http://localhost:3000`，即可開始使用記帳小幫手

8. 載入種子檔案  
  執行 `node models/seeds/categorySeeder.js`  
  可登入帳號(name: user2, email: user2@example.com, password: 12345678)  
  執行 `node models/seeds/recordSeeder.js`  
  可登入帳號(name: user1, email: user1@example.com, password: 12345678)  

## 常用腳本

啟動本地伺服器 `npm run dev`  
載入種子資料 `npm run seed`
