import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from 'react';

import {useAuth} from 'contexts/AuthContext';

import {getPosts, setPostLoving} from 'api/posts';

import {Post} from 'utils/types/Post';

interface PostsContextType {
  posts: Post[];
  setLoving: (status: 'love' | 'unlove', postId: string) => void;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  setLoving: () => {},
});

export const PostsProvider = ({children}: {children: ReactNode}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const auth = useAuth();

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const setLoving = (status: 'love' | 'unlove', postId: string) => {
    setPostLoving(status, postId);

    setPosts(current =>
      current.map(post => {
        if (post.id === postId) {
          const newLoves =
            status === 'love'
              ? [...post.loves, auth.user?.id || '']
              : post.loves.filter(id => id !== auth.user?.id);

          return {...post, loves: newLoves};
        }

        return post;
      }),
    );
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setLoving,
      }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};
