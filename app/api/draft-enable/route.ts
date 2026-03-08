import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.DRAFT_MODE_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }
  (await draftMode()).enable();
  redirect(searchParams.get("redirect") || "/");
}
