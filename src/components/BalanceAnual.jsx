import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "../lib/supabase";
import { getCurrentYearRange } from "../lib/dateUtils";
import { getLocalTransactionsForRange } from "../assets/localSync";

export default function BalanceAnual() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchYearData = async () => {
      const { startOfYear, endOfYear } = getCurrentYearRange();
      const { data, error } = await supabase
        .from("transactions")
        .select("amount, created_at")
        .gte("created_at", startOfYear.format("YYYY-MM-DD"))
        .lte("created_at", endOfYear.format("YYYY-MM-DD"));

      if (error) {
        console.error("Error fetching year data:", error);
      }

      // Merge with local optimistic transactions
      const local = getLocalTransactionsForRange(startOfYear.format('YYYY-MM-DD'), endOfYear.format('YYYY-MM-DD')) || [];
      const merged = (data || []).concat(local).map((t) => ({ ...t, amount: Number(t.amount) }));
      updateChartData(merged);
    };

    const updateChartData = (transactions) => {
      if (!transactions) return;
      const grouped = transactions.reduce((acc, t) => {
        const month = t.created_at.split("-")[1];
        acc[month] = acc[month] || { income: 0, spent: 0 };
        if (t.amount >= 0) acc[month].income += t.amount;
        else acc[month].spent += Math.abs(t.amount);
        return acc;
      }, {});

      setData(Object.entries(grouped).map(([month, val]) => ({ month, income: val.income, spent: val.spent })));
    };

    fetchYearData();

    // Optionally refresh periodically:
    const interval = setInterval(fetchYearData, 30_000);
    return () => clearInterval(interval);
    return undefined;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
  <Area type="monotone" dataKey="income" stroke="#10B981" fill="#a7f3d0" />
  <Area type="monotone" dataKey="spent" stroke="#ef4444" fill="#fecaca" />
      </AreaChart>
    </ResponsiveContainer>
  );
}