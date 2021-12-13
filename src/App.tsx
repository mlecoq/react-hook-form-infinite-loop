import "./styles.css";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import { Database, appSchema, tableSchema } from "@nozbe/watermelondb";
import Post from "./Post";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import UpdatePost from "./UpdatePost";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";

export default function App() {
  const adapter = new LokiJSAdapter({
    schema: appSchema({
      version: 1,
      tables: [
        tableSchema({
          name: "posts",
          columns: [
            { name: "title", type: "string" },
            { name: "body", type: "string" },
          ],
        }),
      ],
    }),
    useWebWorker: false,
    useIncrementalIndexedDB: true,
  });

  const database = new Database({
    adapter,
    modelClasses: [Post],
  });

  return (
    <DatabaseProvider database={database}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/updatePost/:postId" element={<UpdatePost />} />
      </Routes>
    </DatabaseProvider>
  );
}
