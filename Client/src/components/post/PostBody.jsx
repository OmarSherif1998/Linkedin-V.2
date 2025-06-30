import useThemeClasses from '../../hooks/useThemeClasses';

function PostBody({ postData }) {
  const { textColorClass } = useThemeClasses();
  return (
    <div>
      {' '}
      <section className='mt-5 break-words'>
        <p className={`ml-[2rem] pb-5 ${textColorClass}`}>
          {postData?.content}
        </p>
      </section>
      {postData?.media?.length > 0 ? (
        <figure className='m-auto flex max-h-[30rem] cursor-pointer justify-center border border-gray-100 object-cover p-[1rem]'>
          <img
            loading='lazy'
            src={postData?.media}
            alt=''
            className='max-h-[20rem]'
          />
        </figure>
      ) : null}
    </div>
  );
}

export default PostBody;
