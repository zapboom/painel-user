import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import EntrieService from "@/app/services/EntrieService";
import Toast from "awesome-toast-component";
import { Entrie } from "@/app/services/interfaces";
import useAuth from "@/hooks/useAuth";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    type: "pie", // Mudamos para "pie" para usar um gráfico de setores
  },
  colors: ["#FFA70B", "#259AE6", "#F0F0F0"], // Atualizei as cores de acordo com a descrição
  labels: ["Amarelo", "Azul", "Branco"], // Atualizei os rótulos
  legend: {
    show: true,
    position: "bottom",
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 480,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 400,
        },
      },
    },
  ],
};

type ChartThreeProps = {
  entries: number[];
};

const ChartThree: React.FC<ChartThreeProps> = ({ entries }) => {
  const hasValidData = Array.isArray(entries) && entries.length > 0;
const reorganizedEntries = [entries[2], entries[1], entries[0]];
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Relatório Double
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          {hasValidData ? (
            <ReactApexChart
              options={options}
              series={reorganizedEntries}
              type="pie"
            />
          ) : (
            <p>No valid entries available for the chart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
