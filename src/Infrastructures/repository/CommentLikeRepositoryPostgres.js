const CommentLikeRepository = require('../../Domains/commentLikes/CommentLikeRepository');
const PostCommentLike = require('../../Domains/commentLikes/entities/PostCommentLike');

class CommentLikeRepositoryPostgres extends CommentLikeRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addCommentLikeByCommentId(postedCommentLike) {
    const { commentId, userId } = postedCommentLike;
    const id = `like-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO user_comment_likes VALUES($1, $2, $3) RETURNING id, comment_id, user_id',
      values: [id, userId, commentId],
    };
    const result = await this._pool.query(query);
    return new PostCommentLike({
      id: result.rows[0].id,
      userId: result.rows[0].user_id,
      commentId: result.rows[0].comment_id,
    });
  }

  async deleteCommentLikeByCommentId(commentId, userId) {
    const query = {
      text: 'DELETE FROM user_comment_likes WHERE comment_id = $1 AND user_id = $2 RETURNING id',
      values: [commentId, userId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async verifyCommentLikeByCommentId(commentId, userId) {
    const query = {
      text: 'SELECT id FROM user_comment_likes WHERE comment_id = $1 AND user_id = $2',
      values: [commentId, userId],
    };
    const result = await this._pool.query(query);
    return result.rows.length;
  }
}

module.exports = CommentLikeRepositoryPostgres;
