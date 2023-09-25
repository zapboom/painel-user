import BotService from "@/app/services/BotService";
import EntrieService from "@/app/services/EntrieService";
import StrategieService from "@/app/services/StrategieService";
import { Bot, Strategie } from "@/app/services/interfaces";
import Toast from "awesome-toast-component";
import { useState, useEffect } from "react";
import StrategieUnique from "./strategie";
import CreateStrategieModal from "./modal/create-strategie.modal";
type StrategiesProps = {
  token: string;
};

type StrategiesState = {
  bots: Bot[];
};

type StrategiesMutateState = {
  bot_id?: string;
  bot?: Bot;
  strategies?: Strategie[];
};

export default function Strategies({ token }: StrategiesProps) {
  const [state, setState] = useState<StrategiesState>({
    bots: [],
  });
  const [mutateState, setMutateState] = useState<StrategiesMutateState>({});
  console.log(mutateState);
  useEffect(() => {
    const getBots = async (token: string) => {
      const botService = new BotService(token);

      const bots = await botService.listBots();

      if (typeof bots === "string") {
        new Toast(bots);
        return;
      }

      setState((prev) => ({
        ...prev,
        bots,
      }));
    };

    const getStrategies = async (token: string, bot_id: string) => {
      const strategiesService = new StrategieService(token);

      const strategies = await strategiesService.listStrategiesBot(bot_id);
      console.log(strategies);
      if (typeof strategies === "string") {
        new Toast(strategies);
        return;
      }

      setMutateState((prev) => ({
        ...prev,
        strategies,
      }));
    };

    if (token) {
      getBots(token);
    }
    if (token) {
      if (mutateState.bot_id) {
        getStrategies(token, mutateState.bot_id);
      }
    }
  }, [mutateState.bot_id, token]);

  console.log(mutateState);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(value, name);
    console.log(name);
    if (name === "bot_id") {
      const indexBot = state.bots.findIndex((bot) => bot.id === value);
      console.log(name, indexBot);
      setMutateState((prev) => ({
        ...prev,
        bot: state.bots[indexBot],
      }));
    }
    setMutateState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-8 bg-white p-4 shadow rounded-lg">
      <h2 className="text-gray-500 text-lg font-semibold pb-4">Estratégias</h2>

      <div className="my-1"></div>
      <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>

      <label
        htmlFor="bot_id"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Selecione um Bot
      </label>
      <select
        id="bot_id"
        name="bot_id"
        value={mutateState.bot_id}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Selecione um bot</option>
        {state.bots &&
          state.bots.length > 0 &&
          state.bots.map((bot, index) => {
            return (
              <option value={bot.id} key={index}>
                [{bot.gameType}] {bot.name} [{bot.signalType}]
              </option>
            );
          })}
      </select>

      {mutateState.bot && mutateState.bot.gameType === "DOUBLE" && (
        <table className="w-full table-auto text-sm">
          <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
            Estratégia
          </th>
          <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
            Cor alvo
          </th>
          <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
            Ações
          </th>

          <tbody>
            {mutateState.strategies &&
              mutateState.strategies.length > 0 &&
              mutateState.strategies.map((strategie, index) => (
                <StrategieUnique
                  strategie={strategie}
                  key={index}
                  token={token}
                />
              ))}
          </tbody>
        </table>
      )}

      {mutateState.bot && token && (
        <CreateStrategieModal token={token} bot_id={mutateState.bot.id} />
      )}
    </div>
  );
}
