import { CreatePost } from '@application/use-cases/posts/CreatePost';
import { makeFakePost } from '@tests/domain/mocks/entities';
import { CreatePostRepositoryStub } from '@tests/infra/mocks/posts/repositories';

type SutTypes = {
  sut: CreatePost;
  createPostRepositoryStub: CreatePostRepositoryStub;
};

const makeSut = (): SutTypes => {
  const createPostRepositoryStub = new CreatePostRepositoryStub();
  const sut = new CreatePost(createPostRepositoryStub);
  return {
    sut,
    createPostRepositoryStub,
  };
};

describe('CreatePost', () => {
  it('should call CreatePostRepository with correct data', async () => {
    const { sut, createPostRepositoryStub } = makeSut();
    const createPostSpy = jest.spyOn(createPostRepositoryStub, 'createPost');
    const { userId, title, text } = makeFakePost();
    await sut.execute({ userId, title, text });
    expect(createPostSpy).toHaveBeenCalledWith({
      userId,
      title,
      text,
      totalComments: 0,
    });
  });

  it('should return the post id on success', async () => {
    const { sut } = makeSut();
    const {
      id, userId, title, text,
    } = makeFakePost();
    const response = await sut.execute({ userId, title, text });
    expect(response).toBe(id);
  });
});
