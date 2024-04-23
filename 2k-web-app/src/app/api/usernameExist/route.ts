import prisma from "@/prismaClient";
export async function POST(request: Request) {
  try {
    const incomingPayload = await request.json();
    console.log("Incoming payload:", incomingPayload);

    if (!incomingPayload.username) {
      return new Response("Missing username", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username: incomingPayload.username,
      },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ exists: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ exists: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error checking existing user:", error);
    return new Response("Error processing your request", { status: 500 });
  }
}
