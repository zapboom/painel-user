"use client";
import CrudFormBot from "@/components/bots/crud.form.bot";
import useAuth from "@/hooks/useAuth";

type EditBotPageProps = {
  params: {
    bot_id: string;
  };
};

export default function EditBotPage({ params }: EditBotPageProps) {
  const { getToken } = useAuth();
  const token = getToken();
  return <>{token && <CrudFormBot token={token} id={params.bot_id} />}</>;
}
