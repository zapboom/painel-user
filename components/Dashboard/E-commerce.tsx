"use client";
import React, { useState, useEffect } from "react";
import ChartThree from "../Charts/ChartThree";
import useAuth from "@/hooks/useAuth";
import EntrieService from "@/app/services/EntrieService";
import Toast from "awesome-toast-component";
import { Entrie } from "@/app/services/interfaces";

interface DashboardData {
  entries: number[];
}

const ECommerce: React.FC = () => {
  const { getToken } = useAuth();

  const [state, setState] = useState<DashboardData>({
    entries: [10, 10, 10],
  });
  const token = getToken();

  useEffect(() => {
    async function getEntries(token: string) {
      const entrieService = new EntrieService(token);
      const entries = await entrieService.getAllEntriesDouble();

      if (typeof entries === "string") {
        new Toast(entries, {
          timeout: 5000,
        });
      } else if (Array.isArray(entries) && entries.length > 0) {
        const colorCount: { [key: number]: number } = {};

        entries.forEach((entrie: Entrie) => {
          if (entrie.color !== undefined) {
            colorCount[entrie.color] = (colorCount[entrie.color] || 0) + 1;
          }
        });
        console.log("Entries:", entries);
        console.log("Color count", colorCount);

        const newEntries = Object.values(colorCount);
        console.log("New seris", newEntries);
        setState({
          entries: newEntries,
        });
      }
    }

    if (token) {
      getEntries(token);
    }
  }, [token]);
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartThree  entries={state.entries}/>
      </div>
    </>
  );
};

export default ECommerce;
