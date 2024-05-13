const PostCommentLike = require('../PostCommentLike');

describe('a PostCommentLike entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      commentId: 'comment-123',
    };
    expect(() => new PostCommentLike(payload)).toThrowError(
      'POST_COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });
  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 123,
      userId: 'user-123',
      commentId: 123,
    };
    expect(() => new PostCommentLike(payload)).toThrowError(
      'POST_COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });
  it('should create PostCommentLike object correctly', () => {
    const payload = {
      id: 'like-123',
      userId: 'user-123',
      commentId: 'comment-123',
    };
    const postCommentLike = new PostCommentLike(payload);
    expect(postCommentLike.id).toEqual(payload.id);
    expect(postCommentLike.commentId).toEqual(payload.commentId);
    expect(postCommentLike.userId).toEqual(payload.userId);
  });
});
