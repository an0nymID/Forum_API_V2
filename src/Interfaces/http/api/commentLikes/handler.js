const CommentLikeUseCase = require('../../../../Applications/use_case/CommentLikeUseCase');

class CommentLikeHandler {
  constructor(container) {
    this._container = container;
    this.putCommentLikeHandler = this.putCommentLikeHandler.bind(this);
  }

  async putCommentLikeHandler(request, h) {
    const useCasePayload = {
      commentId: request.params.commentId,
      userId: request.auth.credentials.id,
      threadId: request.params.threadId,
    };
    const commentLikeUseCase = this._container.getInstance(
      CommentLikeUseCase.name,
    );
    await commentLikeUseCase.execute(useCasePayload);
    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}
module.exports = CommentLikeHandler;
