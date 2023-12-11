import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';

const fetchComments = async (postId) => {
  const response = await fetch(`https://api.example.com/posts/${postId}/comments`);
  const json = await response.json();
  return json;
};

const createComment = async (postId, newComment) => {
  const response = await fetch(`https://api.example.com/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: newComment }),
  });
  const json = await response.json();
  return json;
};

function Comments() {
  const { data: comments, isLoading, error } = useQuery('comments', () => fetchComments(1));
  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState('');

  const { mutate, isLoading: isMutating, error: mutationError } = useMutation(createComment, {
    onMutate: async (newComment) => {
      const existingComments = queryClient.getQueryData('comments');
      queryClient.setQueryData('comments', {
        ...existingComments,
        comments: [
          ...existingComments.comments,
          { id: Math.random(), content: newComment },
        ],
      });
    },
    onSuccess: () => {
      setNewComment('');
    },
    onError: (error) => {
      console.error('Failed to create comment:', error);
    },
  });

  const handleAddComment = () => {
    if (newComment) {
      mutate(newComment);
    }
  };

  if (isLoading || isMutating) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>

      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      {mutationError && <div>Error: {mutationError.message}</div>}
    </div>
  );
}

export default Comments;
