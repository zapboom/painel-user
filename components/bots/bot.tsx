import BotService from "@/app/services/BotService";
import { Bot, WhatssapBotGroup } from "@/app/services/interfaces";
import Toast from "awesome-toast-component";
import GroupModal, { Group } from "./groups/GroupModal";
import { useEffect, useState } from "react";
interface BotProps {
  bot: Bot;
  token: string;
}

export interface BotUniqueState {
  groups: WhatssapBotGroup[];
  showModal: boolean;
  selectedGroup?: WhatssapBotGroup;
}

export default function BotUnique({ bot, token }: BotProps) {
  const [state, setState] = useState<BotUniqueState>({
    groups: [],
    showModal: false,
  });

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
  const handleDelete = async () => {
    const botService = new BotService(token);

    new Toast("Deletando bot");
    await botService.deleteBot(bot.id);
    new Toast("Bot deletado com sucesso");
  };

  // useeffect checa se algum grupo foi selecionado caso foi, quer dizer que o bot foi iniciado
  useEffect(() => {
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
  }, [bot.id, bot.name, state.selectedGroup, token]);

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
          </div>
        </td>
      </tr>
    </>
  );
}
