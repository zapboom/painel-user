/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { captalized } from "../../app/functions/captalized";
import { Connection } from "@/app/services/interfaces";
import ConnectionService from "@/app/services/ConnectionService";
import Toast from "awesome-toast-component";
import BotService from "@/app/services/BotService";
import { useRouter } from "next/navigation";
interface FormData {
  name: string;
  gales: number | null;
  game_type: "DOUBLE";
  signal_type: "NORMAL" | "VIP";
  finish_messages: string | null;
  welcome_messages: string | null;
  bet_message: string | null;
  green_message: string | null;
  red_message: string | null;
  max_signal: number | null;
  signal_interval: number | null;
  finish_time: number | null;
  minutes_late_entry: number | null;
  whatsappConnectionId: string | null;

  whatssapConnections: Connection[];
}

interface CrudFormBotProps {
  token: string;
  id?: string;
}

const CrudFormBot: React.FC<CrudFormBotProps> = ({ token, id }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "my-bot-name",
    finish_messages:
      "E por hoje é tudo pessoal![OTHER]Esperamos que tenham tirado bom proveito! e caso queira participar de sorteio de banca semanalmente preencha esseformulário[ESPACO][ESPACO]https://forms.gle/i394bsQRB3By8FEMA",
    gales: 2,
    signal_type: "NORMAL",
    green_message: "🤑🤑🤑GREEN🤑🤑🤑",
    red_message: "❌❌❌❌❌❌",
    max_signal: 30,
    signal_interval: 200,
    finish_time: 300,
    minutes_late_entry: 2,
    game_type: "DOUBLE",
    whatsappConnectionId: "6510f697d96ef5044eefe8b8",
    welcome_messages:
      "Vamos começar![OTHER]A contagem regressiva para o início dos sinais está em andamento! 🕒📊",
    bet_message:
      "*FAÇA SUA APOSTA AS [TIME_2]!!*🦈✅🚀[ESPACO][ESPACO]APOSTAR NO *[CORM]*[ESPACO][ESPACO]🥇 FAZER ATÉ 3 ENTRADAS NO MINUTO!![ESPACO][ESPACO]OS SINAIS DO MEU ROBÔ SÓ SERVEM PRA PLATAFORMA ABAIXO OK?🦈✅LINK DE CADASTRO👇🏻📊📱[ESPACO][ESPACO]https://shre.ink/bugdodouble ",
    whatssapConnections: [],
  });
  const { push } = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(formData);
  const handleCreateBot = async () => {
    console.log("Token", token);
    if (!token) return;

    const botService = new BotService(token);
    console.log("passei da criação do serviço do bot");
    const {
      bet_message,
      finish_messages,
      finish_time,
      gales,
      game_type,
      green_message,
      max_signal,
      minutes_late_entry,
      name,
      red_message,
      signal_interval,
      signal_type,
      welcome_messages,
      whatsappConnectionId,
    } = formData;

    if (
      !bet_message ||
      !finish_messages ||
      !finish_time ||
      !gales ||
      !game_type ||
      !green_message ||
      !max_signal ||
      !minutes_late_entry ||
      !name ||
      !red_message ||
      !signal_interval ||
      !signal_type ||
      !welcome_messages ||
      !whatsappConnectionId
    ) {
      return;
    }

    const response = await botService.createBot({
      bet_message: bet_message,
      finish_messages: [finish_messages],
      finish_time: Number(finish_time),
      gales: gales,
      game_type: game_type,
      green_message: green_message,
      max_signal: Number(max_signal),
      minutes_late_entry: Number(minutes_late_entry),
      name: name,
      red_message: red_message,
      signal_interval: Number(signal_interval),
      signal_type: signal_type,
      welcome_messages: [welcome_messages],
      whatsappConnectionId: whatsappConnectionId,
    });

    if (typeof response === "string") {
      new Toast(response);
      return;
    }

    push("/bots");
  };

  useEffect(() => {
    const getConnections = async () => {
      if (!token) return;
      const connectionsService = new ConnectionService(token);

      const connections = await connectionsService.getAllConnections();

      if (typeof connections === "string") {
        new Toast(connections);
        return;
      }

      setFormData({
        ...formData,
        whatssapConnections: connections,
      });
    };

    if (token) {
      getConnections();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCreateBot();
    console.log(formData);
  };

  const crudPhase = id ? "atualizar" : "criar";

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {captalized(crudPhase)} bot
        </h2>
        <form action="#" onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nome do bot
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
              />
              <p className="text-xs font-bold">
                *Nome do bot usado para identificação posterior
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gales
              </label>
              <input
                type="number"
                name="gales"
                id="gales"
                value={formData.gales ?? 0}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="2"
                required
              />
              <p className="text-xs font-bold">
                *Quantos gales o bot vai fazer até considerar o resultado do
                sinal?
              </p>
            </div>
            <div>
              <label
                htmlFor="game_type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo de jogo
              </label>
              <select
                id="game_type"
                name="game_type"
                value={formData.game_type}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="DOUBLE">Double</option>
              </select>
              <p className="text-xs font-bold">
                *Tipo de jogo que o bot vai enviar os sinais
              </p>
            </div>
            <div>
              <label
                htmlFor="whatsappConnectionId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Conexão do Whatssap
              </label>
              <select
                id="whatsappConnectionId"
                name="whatsappConnectionId"
                value={formData.whatsappConnectionId ?? ""}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option defaultChecked disabled></option>
                {formData.whatssapConnections.length > 0 &&
                  formData.whatssapConnections.map((connection, index) => {
                    if (
                      !connection.connectionSessionData.status &&
                      connection.connectionSessionData.profileNumber
                    )
                      return null;
                    return (
                      <option key={index} value={connection.id}>
                        {connection.connectionSessionData.profileNumber}
                      </option>
                    );
                  })}
              </select>
              <p className="text-xs font-bold">
                *Conexão do Whatssap Business a ser usada para o envio de sinais
              </p>
            </div>
            <div>
              <label
                htmlFor="signal_type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo de sinal
              </label>
              <select
                id="signal_type"
                name="signal_type"
                value={formData.signal_type}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="NORMAL">Normal</option>
                <option value="VIP">Vip</option>
              </select>
              <p className="text-xs font-bold">
                *Tipo do sinal do bot (identificação)
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="signal_interval"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Intervalo entre sinais
              </label>
              <input
                type="number"
                name="signal_interval"
                id="signal_interval"
                value={formData.signal_interval ?? 0}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0"
                required
              />
              <p className="text-xs font-bold">
                Qual será o intervalo de tempo entre um sinal e outro (segundos)
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="max_signal"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Máximo de sinais por sessão
              </label>
              <input
                type="number"
                name="max_signal"
                id="max_signal"
                value={formData.max_signal ?? 0}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="200"
                required
              />
              <p className="text-xs font-bold">
                Qual será o máximo de sinais por sessão, lembrando que o bot
                será parado automaticamente caso esse número seja maior do que o
                seu plano permite
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="max_signal"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Entrar após quantos minutos
              </label>
              <input
                type="number"
                name="minutes_late_entry"
                id="minutes_late_entry"
                value={formData.minutes_late_entry ?? 0}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="2"
                required
              />
              <p className="text-xs font-bold">
                Após a identificação do sinal em quantos minuntos será
                contabilizado o inicio das entradas
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="max_signal"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tempo de finalização de sessão
              </label>
              <input
                type="number"
                name="finish_time"
                id="finish_time"
                value={formData.finish_time ?? 0}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="300"
                required
              />
              <p className="text-xs font-bold">
                Quantos minutos cada sessão de sinais vai durar
              </p>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mensagem do sinal
              </label>
              <textarea
                id="bet_message"
                name="bet_message"
                rows={8}
                value={formData.bet_message ?? ""}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escreva aqui a mensagem que será enviada ao encontrar uma estratégia valida"
              />
              <p className="text-xs font-bold">
                Você pode colocar váriaveis textuais são certas palavras
                especiais que serão alteradas dinamicamente pelo nosso servidor
              </p>
              <br />
              <p className="text-xs font-bold">
                [TIME_NUM_MIN] - Exemplo: [TIME_4] enviado às 19:36 será
                substituído por 19:40
              </p>
              <p className="text-xs font-bold">
                [OTHER] - Resultara numa quebra de mensagem a mensagem será
                repartida e enviada separadamente
              </p>
              <p className="text-xs font-bold">
                [ESPACO] - Convertera numa quebra de linha não tente fazer isso
                no editor acima gerará resultados indesejados
              </p>
              <p className="text-xs font-bold">
                [CORM] - Cor alvo da aposta em letras maisculas
              </p>
              <p className="text-xs font-bold">
                [COLOR] - Cor alvo da aposta em letras minúsculas
              </p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="green_message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mensagem do Green
              </label>
              <textarea
                id="green_message"
                name="green_message"
                rows={1}
                value={formData.green_message ?? ""}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escreva aqui a mensagem que será enviada ao resultado do sinal for um green"
              />
              <p className="text-xs text-danger font-bold">
                sem váriaveis textuais disponíveis
              </p>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="red_message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mensagem do Red
              </label>
              <textarea
                id="red_message"
                name="red_message"
                rows={1}
                value={formData.red_message ?? ""}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escreva aqui a mensagem que será enviada ao resultado do sinal ser um red"
              />
              <p className="text-xs text-danger font-bold">
                sem váriaveis textuais disponíveis
              </p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="green_message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mensagem de Inicio de Sessão
              </label>
              <textarea
                id="welcome_messages"
                name="welcome_messages"
                rows={8}
                value={formData.welcome_messages ?? ""}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escreva aqui a mensagem que será enviada ao iniciar uma sessão"
              />
              <p className="text-xs text-success font-bold">
                váriaveis textuais disponíveis: [ESPACO] [OTHER]
              </p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="green_message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mensagem de termino de Sessão
              </label>
              <textarea
                id="finish_messages"
                name="finish_messages"
                rows={8}
                value={formData.finish_messages ?? ""}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escreva aqui a mensagem que será enviada ao finalizar uma sessão"
              />
              <p className="text-xs text-success font-bold">
                váriaveis textuais disponíveis: [ESPACO] [OTHER]
              </p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              style={{
                background: "lime",
              }}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {captalized(crudPhase)}
            </button>
            {id && (
              <button
                type="button"
                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  className="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Deletar
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CrudFormBot;
