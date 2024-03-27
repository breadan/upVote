import { commentModel } from '../../../models/comment.model.js';
import { replayModel } from '../../../models/replay.model.js';

//================= add reply =================
const addReply = async (req, res, next) => {
  const { content, onModel } = req.body;
  const { _id } = req.user;
  const { replyOnId } = req.params;
  //Check CommentId
  if (onModel == 'Comment') {
    const comment = await commentModel.findById(replyOnId);
    if (!comment) return next(new Error('Comment not found', { cause: 404 }));
    //Check ReplyId
    else if (onModel == 'Reply') {
      const reply = await replayModel.findById(replyOnId);
      if (!reply) return next(new Error('reply not found', { cause: 404 }));
    }
  }
  //create Reply
  const reply = await replayModel.create({
    content,
    addBy: _id,
    onModel,
    replyOnId,
  });
  res.status(200).json({ message: 'Reply created Successfully', reply });
};

export { addReply };
