import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from 'react';

import {useAuth} from 'contexts/AuthContext';

import {getPosts, setPostLoving, viewPost} from 'api/posts';

import {Post} from 'utils/types/Post';

interface PostsContextType {
  posts: Post[];
  getUserPosts: (userId: string) => Post[];
  setLoving: (status: 'love' | 'unlove', postId: string) => void;
  addView: (postId: string) => void;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  getUserPosts: () => [],
  setLoving: () => {},
  addView: () => {},
});

export const PostsProvider = ({children}: {children: ReactNode}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const auth = useAuth();

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.userId === userId);
  };

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

  const addView = (postId: string) => {
    setPosts(current => {
      const foundPost = current.find(post => post.id === postId);

      if (foundPost && foundPost.views.some(id => id === auth.user?.id)) {
        return current;
      }

      viewPost(postId);

      return current.map(post => {
        if (post.id === postId) {
          return {...post, views: [...post.views, auth.user?.id || '']};
        } else {
          return post;
        }
      });
    });
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setLoving,
        getUserPosts,
        addView,
      }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};
