import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function getSession() {
  return await getServerSession(options);
}
