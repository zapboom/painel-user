"use client";
import { useState, useEffect } from "react";
import Connections from "@/components/connections/connections";
import useAuth from "@/hooks/useAuth";
import { Metadata } from "next";
import { Connection } from "../services/interfaces";
import ConnectionService from "../services/ConnectionService";
import Toast from "awesome-toast-component";

export const metadata: Metadata = {
  title: "Connections Page | Zap Boom",
  description: "This is the connections page for Zap Boom",
};

interface ConnectionsPageState {
  connections: Connection[];
}

const ConnectionsPage = () => {
  const { getToken } = useAuth();
  const [state, setState] = useState<ConnectionsPageState>({
    connections: [],
  });
  const token = getToken();
  useEffect(() => {
    const getConnections = async (token: string) => {
      const connectionsService = new ConnectionService(token);
      const connections = await connectionsService.getAllConnections();

      if (typeof connections === "string") {
        new Toast(connections, {
          timeout: 5000,
        });
        return;
      }

      setState({
        connections: connections,
      });
    };

    if (token) {
      getConnections(token);
    }
  }, [token]);
  return (
    <>
      {token && <Connections token={token} connections={state.connections} />}
    </>
  );
};
export default ConnectionsPage;
