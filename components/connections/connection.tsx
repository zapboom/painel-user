import ConnectionService from "@/app/services/ConnectionService";
import { Connection } from "@/app/services/interfaces";
import Toast from "awesome-toast-component";
import { useRouter } from "next/navigation";
import { useState } from "react";
type ConnectionProps = {
  connection: Connection;
  token: string;
};
export default function ConnectionTable({
  connection,
  token,
}: ConnectionProps) {
  const connectionService = new ConnectionService(token);
  const [deleted, setDeleted] = useState(false);
  const { push } = useRouter();
  const handleDelete = async () => {
    new Toast("deletando conexão");
    const response = await connectionService.deleteConnection(connection.id);

    if (typeof response === "string") {
      return new Toast(response);
    }

    new Toast("conexão deletada");
    setDeleted(true);
  };

  const handleExitSession = async () => {
    new Toast("Encerrando sessão (todos os bots conectados vão parar)");
    const response = await connectionService.closeSession(connection.id);
    if (typeof response === "string") {
      return new Toast(response);
    }

    connection.connectionSessionData.profileNumber = null;
    connection.connectionSessionData.status = false;
    new Toast("desconectado");
  };
  if (deleted) return null;
  console.log(connection);
  return (
    <tr className="hover:bg-grey-lighter">
      <td className="py-2 px-4 border-b border-grey-light">
        {connection.connectionSessionData.profileNumber
          ? connection.connectionSessionData.profileNumber
          : "Numero não conectado"}
      </td>
      <td className="py-2 px-4 border-b border-grey-light">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          style={{
            color: connection.connectionSessionData.status ? "green" : "red",
          }}
          viewBox="0 0 21 21"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
          ></path>
        </svg>
      </td>
      <td className="py-2 px-4 border-b border-grey-light">
        <div className="flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            style={{
              color: "red",
            }}
            viewBox="0 0 24 24"
            stroke-width="1.5"
            cursor="pointer"
            onClick={handleDelete}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          {connection.connectionSessionData.status && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                onClick={handleExitSession}
                cursor="pointer"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
