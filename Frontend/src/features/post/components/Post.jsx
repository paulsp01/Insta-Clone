
import React, { useContext, useState } from 'react'
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal
} from 'lucide-react'

import { postContext } from '../context/post.context.jsx'

const Post = ({ user, post,currentUser  }) => {

  const {loading, likePost, unLikePost } = useContext(postContext)

  const [saved, setSaved] = useState(false)

  // Check whether current user liked this post
  const isLiked = post.isLiked

  // Like Post
  const handleLike = async () => {
    await likePost(post._id)
  }

  // Unlike Post
  const handleUnLike = async () => {
    await unLikePost(post._id)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

      {/* User Header */}
      <div className="flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-3">
          <img
            src={user.profileImage}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="text-sm font-semibold text-gray-900">
              {user.username}
            </p>
            <p className="text-xs text-gray-500">
              Kolkata, India
            </p>
          </div>
        </div>

        <MoreHorizontal className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Post Image */}
      <div>
        <img
          src={post.image}
          alt="post"
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="px-4 pt-3">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <Heart
              onClick={isLiked ? handleUnLike : handleLike}
              className={`w-6 h-6 cursor-pointer transition ${
                isLiked
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-800'
              }`}
            />

            <MessageCircle className="w-6 h-6 cursor-pointer" />

            <Send className="w-6 h-6 cursor-pointer" />

          </div>

          <Bookmark
            onClick={() => setSaved(!saved)}
            className={`w-6 h-6 cursor-pointer ${
              saved ? 'fill-black text-black' : 'text-gray-800'
            }`}
          />

        </div>

        {/* Likes */}
        <p className="text-sm font-semibold mt-3">
          {post.likesCount || 0} likes
        </p>

        {/* Caption */}
        <p className="text-sm mt-2 text-gray-800">
          <span className="font-semibold mr-2">
            {user.username}
          </span>
          {post.caption}
        </p>

        <p className="text-sm text-gray-500 mt-2 cursor-pointer">
          View all comments
        </p>

      </div>

    </div>
  )
}

export default Post
