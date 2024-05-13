const pool = require('../../database/postgres/pool');
const UserCommentLikesTableTestHelper = require('../../../../tests/UserCommentLikesTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const PostedCommentLike = require('../../../Domains/commentLikes/entities/PostedCommentLike');
const PostCommentLike = require('../../../Domains/commentLikes/entities/PostCommentLike');
const CommentLikeRepositoryPostgres = require('../CommentLikeRepositoryPostgres');

describe('LikeCommentRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await UserCommentLikesTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.end();
  });

  describe('addCommentLike function', () => {
    it('should persist add comment like and return added comment like correctly', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        owner: 'user-123',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123';
      const postedCommentLike = new PostedCommentLike({
        commentId: 'comment-123',
        threadId: 'thread-123',
        userId: 'user-123',
      });
      const commentLikeRepository = new CommentLikeRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      const postCommentLike =
        await commentLikeRepository.addCommentLikeByCommentId(
          postedCommentLike,
        );
      expect(postCommentLike).toStrictEqual(
        new PostCommentLike({
          id: 'like-123',
          commentId: 'comment-123',
          userId: 'user-123',
        }),
      );
    });
    it('should add comment like to database', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        owner: 'user-123',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123';
      const postedCommentLike = new PostedCommentLike({
        commentId: 'comment-123',
        userId: 'user-123',
        threadId: 'thread-123',
      });
      const commentLikeRepository = new CommentLikeRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      await commentLikeRepository.addCommentLikeByCommentId(postedCommentLike);
      const commentLike =
        await UserCommentLikesTableTestHelper.findCommentLikeById('like-123');
      expect(commentLike).toHaveLength(1);
    });
  });
  describe('deleteCommentLike function', () => {
    it('should delete comment like from database', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        owner: 'user-123',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-123',
        owner: 'user-123',
      });
      await UserCommentLikesTableTestHelper.addCommentLikeByCommentId({
        id: 'like-123',
        commentId: 'comment-123',
        userId: 'user-123',
      });

      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(
        pool,
        {},
      );
      await commentLikeRepositoryPostgres.deleteCommentLikeByCommentId(
        'comment-123',
        'user-123',
      );
      const commentLike =
        await UserCommentLikesTableTestHelper.findCommentLikeById('like-123');
      expect(commentLike).toHaveLength(0);
    });
  });
  describe('verifyCommentLike function', () => {
    it('should return empty array when comment like not found', async () => {
      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(
        pool,
        {},
      );
      const commentLike =
        await commentLikeRepositoryPostgres.verifyCommentLikeByCommentId(
          'comment-123',
          'user-123',
        );
      expect(commentLike).toStrictEqual(0);
    });
  });
});
