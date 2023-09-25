"use client";

import Bots from "@/components/bots/bots";
import useAuth from "@/hooks/useAuth";
import { Bot } from "../services/interfaces";
import { useEffect, useState } from "react";
import BotService from "../services/BotService";
import Toast from "awesome-toast-component";
interface BotsPageState {
  bots: Bot[];
}
export default function BotsPageTsx() {
  const [state, setState] = useState<BotsPageState>({
    bots: [],
  });

  const { getToken } = useAuth();
  const token = getToken();

  useEffect(() => {
    const retriveBotsAndUpdateState = async () => {
      if (!token) return;
      const botService = new BotService(token);
      const bots = await botService.listBots();

      if (typeof bots === "string") {
        new Toast(bots);
        return;
      }

      setState({
        bots,
      });
    };
    retriveBotsAndUpdateState();
  }, [token]);
  return <>{token && <Bots bots={state.bots} token={token} />}</>;
}
