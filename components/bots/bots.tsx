"use client";

import { Bot } from "@/app/services/interfaces";
import BotUnique from "./bot";

type BotsProps = {
  token: string;
  bots: Bot[];
};

export default function Bots({ token, bots }: BotsProps) {
  console.log(bots);
  return (
    <div className="mt-8 bg-white p-4 shadow rounded-lg">
      <h2 className="text-gray-500 text-lg font-semibold pb-4">Bots</h2>

      <div className="my-1"></div>
      <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>

      <table className="w-full table-auto text-sm">
        <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
          Nome
        </th>
        <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
          Tipo
        </th>
        <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
          Status
        </th>
        <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
          Ações
        </th>
        <tbody>
          {bots &&
            bots.length > 0 &&
            bots.map((bot, index) => {
              return <BotUnique token={token} bot={bot} key={index} />;
            })}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button
          style={{
            backgroundColor: "blue",
            width: "15rem",
          }}
        //   onClick={goToCreateConnection}
          className="bg-blue-500 w-full mt-4 bg-blue-700  btn-blue text-white font-bold py-2 px-4 rounded"
        >
          Novo Bot
        </button>
      </div>
    </div>
  );
}
