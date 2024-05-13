const PostCommentLike = require('../../../Domains/commentLikes/entities/PostCommentLike');
const PostedCommentLike = require('../../../Domains/commentLikes/entities/PostedCommentLike');
const CommentLikeRepository = require('../../../Domains/commentLikes/CommentLikeRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const CommentLikeUseCase = require('../CommentLikeUseCase');

describe('CommentLikeUseCase', () => {
  it('should orchestrating the add comment like action correctly', async () => {
    const useCasePayload = {
      commentId: 'comment-123',
      userId: 'user-123',
      threadId: 'thread-123',
    };
    const mockPostCommentLike = new PostCommentLike({
      id: 'like-123',
      userId: useCasePayload.userId,
      commentId: useCasePayload.commentId,
    });
    const mockCommentLikeRepository = new CommentLikeRepository();
    const mockCommentRepository = new CommentRepository();
    mockCommentLikeRepository.verifyCommentLikeByCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentLikeRepository.addCommentLikeByCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockPostCommentLike));
    mockCommentRepository.addCommentLike = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const commentLikeUseCase = new CommentLikeUseCase({
      commentLikeRepository: mockCommentLikeRepository,
      commentRepository: mockCommentRepository,
    });
    const postCommentLike = await commentLikeUseCase.execute(useCasePayload);
    expect(postCommentLike).toStrictEqual(
      new PostCommentLike({
        id: 'like-123',
        userId: 'user-123',
        commentId: 'comment-123',
      }),
    );
    expect(
      mockCommentLikeRepository.verifyCommentLikeByCommentId,
    ).toBeCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockCommentLikeRepository.addCommentLikeByCommentId).toBeCalledWith(
      new PostedCommentLike(useCasePayload),
    );
    expect(mockCommentRepository.addCommentLike).toBeCalledWith(
      useCasePayload.commentId,
    );
    expect(mockCommentRepository.verifyCommentAvailability).toBeCalledWith(
      useCasePayload.commentId,
      useCasePayload.threadId,
    );
  });

  it('should orchestrating the delete comment like action correctly', async () => {
    const useCaseParams = {
      commentId: 'comment-123',
      threadId: 'thread-123',
    };
    const useCaseUser = {
      userId: 'user-123',
    };
    const mockCommentLikeRepository = new CommentLikeRepository();
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.verifyCommentAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentLikeRepository.verifyCommentLikeByCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve({
        id: 'like-123',
      }));
    mockCommentLikeRepository.deleteCommentLikeByCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.reduceCommentLike = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const commentLikeUseCase = new CommentLikeUseCase({
      commentLikeRepository: mockCommentLikeRepository,
      commentRepository: mockCommentRepository,
    });
    const useCasePayload = {
      commentId: useCaseParams.commentId,
      userId: useCaseUser.userId,
      threadId: useCaseParams.threadId,
    };
    await commentLikeUseCase.execute(useCasePayload);
    expect(
      mockCommentLikeRepository.verifyCommentLikeByCommentId,
    ).toBeCalledWith(useCaseParams.commentId, useCaseUser.userId);
    expect(mockCommentRepository.verifyCommentAvailability).toBeCalledWith(
      useCaseParams.commentId,
      useCaseParams.threadId,
    );
    expect(
      mockCommentLikeRepository.deleteCommentLikeByCommentId,
    ).toBeCalledWith(useCaseParams.commentId, useCaseUser.userId);
    expect(mockCommentRepository.reduceCommentLike).toBeCalledWith(
      useCaseParams.commentId,
    );
  });
});
