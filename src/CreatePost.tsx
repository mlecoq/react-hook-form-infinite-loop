import { useForm } from "react-hook-form";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Post from "./Post";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const form = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const database = useDatabase();

  const navigate = useNavigate();

  return (
    <form
      onSubmit={form.handleSubmit(async (val) => {
        await database.write(async () => {
          const collection = database.collections.get<Post>("posts");
          await collection.create((record) => {
            record.title = val.title;
            record.body = val.body;
          });
        });

        navigate("/");
      })}
    >
      <label>
        Title <input {...form.register("title")} />
      </label>
      <label>
        Body <input {...form.register("body")} />
      </label>
      <button>Submit</button>
    </form>
  );
}
