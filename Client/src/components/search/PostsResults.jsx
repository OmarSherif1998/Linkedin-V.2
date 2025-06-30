import Post from '../post/Post';
import useUser from '../../hooks/useUser';

function PostsResults({ posts }) {
  const user = useUser();
  const transformed = posts.map(({ user, ...rest }) => ({
    ...rest,
    ...user,
  }));

  return (
    <div>
      {transformed?.map((data, idx) => (
        <Post key={idx} postData={data} user={user} hasNav={false} />
      ))}
    </div>
  );
}

export default PostsResults;
