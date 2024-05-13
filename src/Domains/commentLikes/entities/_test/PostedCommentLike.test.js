const PostedCommentLike = require('../PostedCommentLike');

describe('a PostedCommentLike entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      commentId: 'comment-123',
    };
    expect(() => new PostedCommentLike(payload)).toThrowError(
      'POSTED_COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      commentId: 123,
      userId: 'user-123',
      threadId: 123,
    };
    expect(() => new PostedCommentLike(payload)).toThrowError(
      'POSTED_COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create PostedCommentLike object correctly', () => {
    const payload = {
      commentId: 'comment-123',
      userId: 'user-123',
      threadId: 'thread-123',
    };
    const { commentId, userId, threadId } = new PostedCommentLike(payload);
    expect(commentId).toEqual(payload.commentId);
    expect(userId).toEqual(payload.userId);
    expect(threadId).toEqual(payload.threadId);
  });
});
