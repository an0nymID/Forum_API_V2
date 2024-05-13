const CommentLikeRepository = require('../CommentLikeRepository');

describe('CommentLikeRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentLikeRepository = new CommentLikeRepository();

    // Action and Assert
    await expect(
      commentLikeRepository.addCommentLikeByCommentId({}, {}),
    ).rejects.toThrowError('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(
      commentLikeRepository.deleteCommentLikeByCommentId({}, {}),
    ).rejects.toThrowError('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(
      commentLikeRepository.verifyCommentLikeByCommentId({}, {}),
    ).rejects.toThrowError('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
