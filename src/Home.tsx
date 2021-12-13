import { Link } from "react-router-dom";
import withObservables from "@nozbe/with-observables";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { Database } from "@nozbe/watermelondb";
import Post from "./Post";

function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <p>List of posts</p>
      <div>
        {posts.map((post) => (
          <div>
            <Link key={post.id} to={`/updatePost/${post.id}`}>
              {post.id} - {post.title} - {post.body}
            </Link>
          </div>
        ))}
      </div>
      <br />
      <br />
      <Link to="/createPost">Create new post</Link>
    </div>
  );
}

export default withDatabase(
  withObservables([], ({ database }: { database: Database }) => ({
    posts: database.collections.get<Post>("posts").query().observe(),
  }))(Home)
);
