export const enrichPRData = (pr, comments, activity) => {
  const approvalActivity = activity.values.find(
    act => act.approval && act.approval.date
  );

  return {
    id: pr.id,
    title: pr.title,
    description: pr.description,
    author: {
      email: pr.author.emailAddress,
      name: pr.author.display_name
    },
    createdAt: pr.created_on,
    approvedAt: approvalActivity?.approval?.date || null,
    status: pr.state,
    comments: comments.values.map(comment => ({
      id: comment.id,
      content: comment.content.raw,
      author: {
        email: comment.user.emailAddress,
        name: comment.user.display_name
      },
      createdAt: comment.created_on
    }))
  };
};