import Post from '../../../../lib/models/post.model.js';
import User from '@/lib/models/user.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';

export const PUT = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }
    const post = await Post.findById(data.postId);
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      data.postId,
      {
        $push: {
          comments: {
            comment: data.comment,
            user: data.user,
            name: data.name,
            username: data.username,
            profileImg: data.profileImg,
          },
        },
      },
      { new: true }
    );
    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.log('Error adding a comment to a post:', error);
    return new Response('Error adding a comment to a post', { status: 500 });
  }
};
//write post api
export const POST = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const mongoUser = await User.findOne({ clerkId: data.clerkId });
    if (!mongoUser) {
      return new Response('User not found in MongoDB', { status: 404 });
    }

    const newPost = new Post({
      user: mongoUser._id,
      text: data.text,
      image: data.image,
      clerkId: data.clerkId,
      name: data.name,
      username: data.username,
      profileImg: data.profileImg,
      comments: [],
      likes: [],
    });

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.log('Error creating post:', error);
    return new Response('Error creating post', { status: 500 });
  }
};
