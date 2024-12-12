//！！！requireの中は'knex'だけではエラーが出るので、knex.jsファイルのパスを指定する
//sqlite 3をインストールさせようとするエラーの解決方法…参考：https://github.com/knex/knex/issues/2441
const db = require('../knex');
const bcrypt = require('bcrypt');

const USERS = 'users';

module.exports = {
  //全ユーザ取得、初期値は１０人分
  async all(limit = 10) {
    return await db(USERS).limit(limit);
  },
  //ユーザ名からユーザデータ取得
  async find(userName) {
    const [user] = await db(USERS).where({ user_name: userName });
    return user || {}; //名前に当てはまるユーザがいない場合でも空の配列を返し、ログインでの照合に利用
  },
  //初回のサインアップ時にユーザデータ登録、ユーザ名を返す
  async save(userData) {
    const [signedUpUserName] = await db(USERS)
      .insert({
        user_name: userData.user_name,
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10), //ハッシュ化を１０回繰り返して安全なデータとして保存
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('user_name');
    return signedUpUserName;
  },
  //ログイン時にハッシュ化したパスワードと、サインイン時にハッシュ化して登録したパスワードが合っているかを確認、booleanを返す
  async check(userName, password) {
    const userData = await this.find(userName);
    if (userData.id) {
      return bcrypt.compare(password, userData.password);
    } else {
      return false;
    }
  },
};
