import { useParams } from "react-router-dom";
import withObservables from "@nozbe/with-observables";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { Database } from "@nozbe/watermelondb";
import Post from "./Post";
import { of } from "rxjs";
import { useForm } from "react-hook-form";

function UpdatePostForm({ post }: { post: Post | null }) {
  const form = useForm({
    defaultValues: {
      post,
    },
  });

  return (
    <div>
      <label>
        Title <input type="text" name="title" />
      </label>
      <label>
        Body <input type="text" name="body" />
      </label>
    </div>
  );
}

const WithData = withDatabase(
  withObservables(
    [],
    ({ database, postId }: { database: Database; postId?: string }) => {
      return {
        post: postId
          ? database.collections.get<Post>("posts").findAndObserve(postId)
          : of(null),
      };
    }
  )(UpdatePostForm)
);

export default function UpdatePost() {
  const { postId } = useParams();
  return <WithData postId={postId} />;
}
