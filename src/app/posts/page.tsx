import PostForm from "@/components/PostForm";
import DeleteButton from "@/components/DeleteButton";
import { getPosts } from "@/lib/posts";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export default async function Posts() {
  // Buscando os dados no servidor
  const posts: Post[] = await getPosts();

  return (
    <div className="flex-1 h-screen bg-main-color-zinc flex flex-col items-center">
      {/*Formulário para criar um novo post */}
      <PostForm />

      {/*Server component para exibicao */}
      <div className="w-full flex flex-col items-center">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="w-full max-w-10/12 md:max-w-[1104px] mt-10 bg-white rounded-lg shadow-md p-6 mb-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">
                    ID Usuario:
                  </span>
                  <h3 className="font-semibold text-gray-800">{post.userId}</h3>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{post.body}</p>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  {/* Client Component para interatividade */}
                  <DeleteButton postId={post.id} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center mt-10">
            Nenhum post encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
