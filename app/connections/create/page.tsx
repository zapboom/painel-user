"use client";
import CreateConnection from "@/components/connections/create/create_connection";
import useAuth from "@/hooks/useAuth";

export default function CreateConnectionPage() {
  const { getToken } = useAuth();
  const token = getToken();

  return <>{token && <CreateConnection token={token} />}</>;
}
