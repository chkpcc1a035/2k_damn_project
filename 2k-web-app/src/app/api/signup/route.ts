//src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // Referring to the auth.ts we just created
// export const { GET, POST } = handlers;
export async function GET(request: Request) {
  // const cookieStore = cookies()
  // const token = cookieStore.get('token')

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { Yolo: "hi" },
  });
}