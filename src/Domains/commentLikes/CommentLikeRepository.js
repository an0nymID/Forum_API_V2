class CommentLikeRepository {
  async addCommentLikeByCommentId(newLikeComment) {
    throw new Error('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteCommentLikeByCommentId(commentId, userId) {
    throw new Error('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyCommentLikeByCommentId(commentId, userId) {
    throw new Error('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentLikeRepository;
