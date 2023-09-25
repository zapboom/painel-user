import BotService from "@/app/services/BotService";
import { Bot, WhatssapBotGroup } from "@/app/services/interfaces";
import Toast from "awesome-toast-component";
import GroupModal, { Group } from "./groups/GroupModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface BotProps {
  bot: Bot;
  token: string;
}

export interface BotUniqueState {
  groups: WhatssapBotGroup[];
  showModal: boolean;
  selectedGroup: WhatssapBotGroup | null;
}

export default function BotUnique({ bot, token }: BotProps) {
  const [state, setState] = useState<BotUniqueState>({
    groups: [],
    showModal: false,
    selectedGroup: null,
  });
  const { push } = useRouter();
  const handleSelectGroup = (group: WhatssapBotGroup) => {
    setState({
      ...state,
      selectedGroup: group,
    });
  };

  const setModalState = (newState: boolean) => {
    setState({
      ...state,
      showModal: newState,
    });
  };

  // useeffect checa se algum grupo foi selecionado caso foi, quer dizer que o bot foi iniciado
  useEffect(() => {
    console.log(token, state, bot);
    const handleStartBot = async () => {
      const botService = new BotService(token);
      if (!bot.id || !state.selectedGroup) return;

      new Toast(`Iniciando ${bot.name}`);
      const response = await botService.startBot(
        bot.id,
        state.selectedGroup.id._serialized
      );
      if (typeof response === "string") {
        new Toast(response);
        return;
      }
      new Toast("Bot iniciado");
      window.location.reload();
    };
    if (state.selectedGroup) {
      handleStartBot();
    }
  }, [bot, bot.id, bot.name, state, state.selectedGroup, token]);

  const handleGetGroups = async () => {
    if (!token) return;
    new Toast("Buscando grupos");
    const botService = new BotService(token);
    const groups = await botService.listBotGroups(bot.id);
    console.log(groups);
    if (typeof groups === "string") {
      new Toast(groups);
      return;
    }

    new Toast("grupos obtidos");
    setState({
      groups,
      selectedGroup: null,
      showModal: true,
    });
  };

  const handleStopBot = async () => {
    if (!token) return;
    new Toast("Parando Bot");
    const botService = new BotService(token);
    const response = await botService.stopBot(bot.id);
    if (typeof response === "string") {
      new Toast(response);
      return;
    }

    new Toast("Bot parado");
    window.location.reload();
  };

  const showModal = async () => {
    await handleGetGroups();

    console.log("Geted groups", state.groups);

    const elem = document.getElementById("my_modal_" + bot.id);
    if (elem instanceof HTMLDialogElement) {
      elem.showModal();
    }
  };

  const handleEditBot = () => {
    push("/bots/edit/" + bot.id);
  };

  return (
    <>
      <GroupModal
        state={state}
        handleSelectGroup={handleSelectGroup}
        setModalState={setModalState}
        showModal={state.showModal}
        bot_id={bot.id}
        groups={state.groups}
      />
      <tr className="hover:bg-grey-lighter">
        <td className="py-2 px-4 border-b border-grey-light">{bot.name}</td>
        <td className="py-2 px-4 border-b border-grey-light">
          {bot.signalType}
        </td>
        <td className="py-2 px-4 border-b border-grey-light">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            style={{
              color: bot.in_use ? "green" : "red",
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
            {!bot.in_use && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                onClick={async () => {
                  await handleGetGroups();
                  await showModal();
                }}
                cursor="pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                />
              </svg>
            )}
            {bot.in_use && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                cursor="pointer"
                onClick={handleStopBot}
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              cursor="pointer"
              onClick={handleEditBot}
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
        </td>
      </tr>
    </>
  );
}
