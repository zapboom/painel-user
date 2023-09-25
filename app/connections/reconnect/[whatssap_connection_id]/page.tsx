"use client";
import CreateConnection from "@/components/connections/create/create_connection";
import useAuth from "@/hooks/useAuth";

type ReconnectConnectionPagePros = {
  params: {
    whatssap_connection_id: string;
  };
};

export default function ReconnectConnectionPage({
  params,
}: ReconnectConnectionPagePros) {
  const { getToken } = useAuth();
  const token = getToken();
  return (
    <>
      {token && params.whatssap_connection_id && (
        <CreateConnection
          token={token}
          whatssap_connection_id={params.whatssap_connection_id}
        />
      )}
    </>
  );
}
