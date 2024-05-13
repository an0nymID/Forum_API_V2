class PostedCommentLike {
  constructor(payload) {
    this._verifyPayload(payload);
    const { commentId, userId, threadId } = payload;
    this.commentId = commentId;
    this.userId = userId;
    this.threadId = threadId;
  }

  _verifyPayload({ commentId, userId, threadId }) {
    if (!commentId || !userId || !threadId) {
      throw new Error('POSTED_COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof commentId !== 'string' ||
      typeof userId !== 'string' ||
      typeof threadId !== 'string'
    ) {
      throw new Error('POSTED_COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PostedCommentLike;
