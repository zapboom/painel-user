"use client";
import CrudFormBot from "@/components/bots/crud.form.bot";
import useAuth from "@/hooks/useAuth";

export default function CreatePage() {
  const { getToken } = useAuth();
  const token = getToken();
  return <>{token && <CrudFormBot token={token} />}</>;
}
