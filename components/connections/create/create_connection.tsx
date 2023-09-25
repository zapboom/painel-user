import ConnectionService from "@/app/services/ConnectionService";
import Toast from "awesome-toast-component";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CreateConnectionProps = {
  token: string;
  whatssap_connection_id?: string;
};
export default function CreateConnection({
  token,
  whatssap_connection_id,
}: CreateConnectionProps) {
  const [qrCode, setQrCode] = useState<string>();
  const [id, setId] = useState(whatssap_connection_id!);
  const { push } = useRouter();
  const createConnection = async () => {
    if (!token) return;
    console.log("Criando sessão");
    const connectionService = new ConnectionService(token);
    const connectionCreated = await connectionService.createConnection();
    if (typeof connectionCreated == "string") {
      new Toast("Erro ao criar conexão");
      return;
    }
    console.log(connectionCreated);
    if (connectionCreated.session.qrcode) {
      const formatedQrCode = connectionCreated.session.qrcode.replace(
        "data:image/png;base64,",
        ""
      );
      setId(connectionCreated.connection.id);
      setQrCode(formatedQrCode);
    }
  };

  useEffect(() => {
    const makeAAction = async (token: string, id?: string) => {
      if (token && id) {
        await handleGetSessionById();
        return;
      }
      if (token && !id) {
        await createConnection();
        return;
      }
    };

    if (token) {
      makeAAction(token, id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, id]);

  const connectionService = new ConnectionService(token);
  const handleGetSessionById = async () => {
    if (!id) {
      return new Toast("Escaneia o QRcode antes de prosseguir");
    }

    const connectionGeted = await connectionService.getConnection(id);

    if (typeof connectionGeted === "string") {
      return new Toast(connectionGeted);
    }
    if (connectionGeted.session) {
      if (
        connectionGeted.session.qrcode &&
        connectionGeted.session.status === "qrcode"
      ) {
        const formatedQrCode = connectionGeted.session.qrcode.replace(
          "data:image/png;base64,",
          ""
        );
        setQrCode(formatedQrCode);
        return new Toast("Escaneie o QRcode antes de prosseguir");
      }
    }

    if (connectionGeted.status_session.status !== "CONNECTED") {
      if (
        connectionGeted.session.qrcode &&
        connectionGeted.session.status === "qrcode"
      ) {
        const formatedQrCode = connectionGeted.session.qrcode.replace(
          "data:image/png;base64,",
          ""
        );
        setQrCode(formatedQrCode);
      }
      return new Toast("Escaneie o QRcode antes de prosseguir");
    }

    push("/");
  };

  return (
    <div className="mt-8 bg-white p-4 shadow rounded-lg flex justify-center">
      {!qrCode && <h1>aguarde o QRcode de autenticação do Whatssap</h1>}
      {qrCode && (
        <div>
          <h1 className="text-title-sm max-w-70 text-center my-4">
            Você deve escanear o QRcode com seu Whatssap Business
          </h1>
          <Image
            width={300}
            height={300}
            className="mx-auto my-0"
            alt="Escanear qrCode"
            src={`data:image/png;base64,${qrCode}`}
          />
          <div className="mt-8 flex justify-between">
            <button
              style={{
                backgroundColor: "gray",
              }}
              onClick={createConnection}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Gerar outro
            </button>
            <button
              style={{
                backgroundColor: "#23db23",
              }}
              onClick={handleGetSessionById}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Escaneei
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
