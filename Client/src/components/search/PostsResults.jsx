import Post from '../post/Post';
import useUser from '../../hooks/useUser';

function PostsResults({ posts }) {
  const user = useUser();
  return (
    <div>
      {posts?.map((data, idx) => (
        <Post key={idx} postData={data} user={user} hasNav={false} />
      ))}
    </div>
  );
}

export default PostsResults;
