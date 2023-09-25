"use client";

import Strategies from "@/components/strategies/strategies";
import useAuth from "@/hooks/useAuth";

export default function StrategiesPage() {
  const { getToken } = useAuth();
  const token = getToken();
  return <>{token && <Strategies token={token} />}</>;
}
