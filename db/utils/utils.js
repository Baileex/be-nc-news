exports.formatDates = list => {
return list.map(inputElement => {
  const element = {...inputElement}
  element.created_at = new Date(element.created_at).toUTCString();
  return element;
})
};

exports.makeRefObj = list => {
   let obj = {};
  for (let i = 0; i < list.length; i++) {
    let newKey = list[i].title;
    obj[newKey] = list[i].article_id;
  }
  return obj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    return {
      body: comment.body,
      article_id: articleRef[comment.belongs_to],
      author: comment.created_by,
      votes: comment.votes,
      created_at: new Date(comment.created_at).toUTCString()
    };
  });
};
