"use client";
import { Connection } from "@/app/services/interfaces";
import useAuth from "@/hooks/useAuth";
import ConnectionTable from "./connection";
import { useRouter } from "next/navigation";
type ConnectionsProps = {
  connections: Connection[];
  token: string;
};

const Connections = ({ connections, token }: ConnectionsProps) => {
  console.log(connections);
  const { push } = useRouter();
  const goToCreateConnection = () => {
    push("/connections/create");
  };

  return (
    <>
      <div className="mt-8 bg-white p-4 shadow rounded-lg">
        <h2 className="text-gray-500 text-lg font-semibold pb-4">Conexões</h2>

        <div className="my-1"></div>
        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>

        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="text-sm leading-normal">
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                Numero
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                Status
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {connections &&
              connections.length > 0 &&
              connections.map((connection, index) => {
                return (
                  <ConnectionTable
                    token={token}
                    connection={connection}
                    key={index}
                  />
                );
              })}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            style={{
              backgroundColor: "blue",
              width: "15rem",
            }}
            onClick={goToCreateConnection}
            className="bg-blue-500 w-full mt-4 bg-blue-700  btn-blue text-white font-bold py-2 px-4 rounded"
          >
            Nova conexão
          </button>
        </div>
      </div>
    </>
  );
};

export default Connections;
