const PostedCommentLike = require('../../Domains/commentLikes/entities/PostedCommentLike');

class CommentLikeUseCase {
  constructor({ commentLikeRepository, commentRepository }) {
    this._commentLikeRepository = commentLikeRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const postedCommentLike = new PostedCommentLike(useCasePayload);
    const { commentId, userId, threadId } = postedCommentLike;
    await this._commentRepository.verifyCommentAvailability(commentId, threadId);
    const verify =
      await this._commentLikeRepository.verifyCommentLikeByCommentId(
        commentId,
        userId,
      );
    if (!verify) {
      await this._commentRepository.addCommentLike(commentId);
      return this._commentLikeRepository.addCommentLikeByCommentId(
        postedCommentLike,
      );
    }
    await this._commentRepository.reduceCommentLike(commentId);
    return this._commentLikeRepository.deleteCommentLikeByCommentId(
      commentId,
      userId,
    );
  }
}

module.exports = CommentLikeUseCase;
