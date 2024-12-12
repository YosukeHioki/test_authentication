const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const environment = process.env.NODE_ENV;
const PORT = process.env.PORT;
const VITE_URL = process.env.VITE_URL;
const usersController = require('./users/usersController');
const userModel = require('./users/usersModel');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const setUpServer = () => {
  app.use(express.json());
  app.use('/', express.static(__dirname + '/dist'));

  //cors設定
  app.use(
    cors({
      origin: VITE_URL, //アクセス許可するURL
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200,
    })
  );
  //認証設定
  app.use(
    session({
      secret: process.env.COOKIE_SECRET, //セッションIDを署名するための秘密鍵
      resave: false, //セッションが変更されていない場合に不要な保存をしない
      saveUninitialized: false, //新しいセッションが初期化されていない場合に不要な保存をしない
      //クッキーの設定
      cookie: {
        maxAge: 60 * 1000, //テストで有効期限を１分に設定
        secure: false, //！！本番ではtrueに変更、httpsでなくhttpでもクッキーが送信される
        httpOnly: true, //JavaScriptからクッキーにアクセスできなくする
      },
    })
  );
  //セッション設定
  app.use(passport.initialize()); //認証ミドルウェアのpassport.jsを初期化しexpressに追加
  app.use(passport.session()); //セッション管理ミドルウェアをexpressに追加
  // LocalStrategy(ユーザー名・パスワードでの認証)の設定
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await userModel.find(username);

      if (!user.id) {
        // ユーザーが見つからない場合
        return done(null, false);
      }
      // ハッシュ化したPWをusersテーブルに保存されたユーザのPWと比較、照合する
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (isPasswordMatched) {
        return done(null, user); // ログイン成功
      } else {
        return done(null, false); // ログイン失敗
      }
    })
  );
  // 認証成功時にセッションにユーザ名を保存する
  passport.serializeUser((user, done) => done(null, user));
  // セッションからユーザ情報を取り出して検証する
  passport.deserializeUser(async (username, done) => {
    const user = await userModel.find(username);
    done(null, user);
  });
  //全ユーザ情報表示----------
  app.get('/api', usersController.index);
  //パスパラメータのユーザ名でユーザ情報表示----------
  app.get('/api/users/:user_name', usersController.view);
  // サインアップ----------
  app.post('/api/signUp', usersController.signUp);
  // ログイン----------
  app.post('/api/logIn', (req, res) => {
    const userData = req.body;
    if (!userData.user_name || !userData.password) {
      return res.status(400).json({
        message: 'ユーザ名とパスワードを入力してください。',
      });
    }
    // 最初に設定したLocalStrategy(ユーザー名とパスワードでの認証)を使ってログイン
    passport.authenticate('local', (err, user) => {
      if (!user) return res.status(401).json({ message: 'ログイン失敗！' });
      // sessionにログイン情報を格納
      req.logIn(user, () => {
        return res.json({
          message: `${user.user_name}さん\nログインされました。`,
        });
      });
    })(req, res);
  });
  // ログアウト----------
  app.get('/api/logOut', (req, res) => {
    req.logout(() => {
      res.json({ message: 'ログアウトしました。' });
    });
  });
  //認証チェック----------
  app.get('/api/auth_check', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ authenticated: true, user: req.user });
    } else {
      res.json({ authenticated: false });
    }
  });
  //認証チェック----------
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      // isAuthenticated() 現在の認証状態を確認するメソッド
      return next(); // 認証済みの場合、次のミドルウェアへ
    }
    res.status(401).json({ message: 'ログインが必要です' });
  }
  // 認証状態をcheckAuthを使って確認
  app.get('/api/users/:user_name', checkAuth, usersController.index);
  app.get('/api/users', checkAuth, usersController.view);
};

setUpServer();
app.listen(PORT, () => {
  if (environment === 'development') {
    console.log(`Local server is running. http://localhost:${PORT}`);
  } else {
    console.log(`Web server is running. PORT No.${PORT}`);
  }
});
