const pool = require('../src/Infrastructures/database/postgres/pool');

const UserCommentLikesTableTestHelper = {
  async addCommentLikeByCommentId({ id, userId, commentId }) {
    const query = {
      text: 'INSERT INTO user_comment_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, commentId],
    };
    await pool.query(query);
  },

  async findCommentLikeById(id) {
    const query = {
      text: 'SELECT * FROM user_comment_likes WHERE id = $1',
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM user_comment_likes WHERE 1=1');
  },
};

module.exports = UserCommentLikesTableTestHelper;
