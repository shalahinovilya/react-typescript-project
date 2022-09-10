import React, {useState} from 'react';
import {Post} from "../interfaces";

interface PostsProps {
    posts: Post[]
}

const Posts = ({posts}: PostsProps) => {

    const [selectedPost, setSelectedPost] = useState(-1)

    function selectedPostHandler(postId: number) {
        if (postId === selectedPost) {
            setSelectedPost(-1)
        } else {
            setSelectedPost(postId)
        }
    }

    return (
        <div className="posts-wrapper__posts posts" onClick={(e) => {
            const className = (e.target as Element).className

            if (className === 'fa-solid fa-angle-down') {
                selectedPostHandler(+((e.target as Element).id))
            }
        }}>
            {posts.map(post => (
                <div className="post__content">
                    <div className="post__title">
                        {post.title}
                        <i
                            id={post.id.toString()}
                            className="fa-solid fa-angle-down"
                        >
                        </i>
                    </div>
                    <div className=
                             {
                                 `post__description ${post.id === selectedPost ? 'active' : 'disabled'}`
                             }
                    >
                        {post.body}
                    </div>
                    <hr/>
                </div>
            ))}
        </div>
    );
};

export default Posts;
