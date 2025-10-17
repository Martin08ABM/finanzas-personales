import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "../lib/supabase";
import { getCurrentMonthRange } from "../lib/dateUtils";
import { getLocalTransactionsForRange } from "../assets/localSync";

export default function BalanceMensual() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonthData = async () => {
      const { startOfMonth, endOfMonth } = getCurrentMonthRange();
      const { data, error } = await supabase
        .from("transactions")
        .select("amount, created_at")
        .gte("created_at", startOfMonth.format("YYYY-MM-DD"))
        .lte("created_at", endOfMonth.format("YYYY-MM-DD"));
      
      if (error) {
        console.error("Error fetching month data:", error);
      }

      const local = getLocalTransactionsForRange(startOfMonth.format('YYYY-MM-DD'), endOfMonth.format('YYYY-MM-DD')) || [];
      const merged = (data || []).concat(local).map((t) => ({ ...t, amount: Number(t.amount) }));
      updateChartData(merged);
    };

    const updateChartData = (transactions) => {
      if (!transactions) return;
      const grouped = transactions.reduce((acc, t) => {
        const day = t.created_at.split("T")[0];
        acc[day] = acc[day] || { income: 0, spent: 0 };
        if (t.amount >= 0) acc[day].income += t.amount;
        else acc[day].spent += Math.abs(t.amount);
        return acc;
      }, {});

      setData(Object.entries(grouped).map(([date, val]) => ({ date, income: val.income, spent: val.spent })));
    };

    fetchMonthData();

    // Optionally refresh periodically:
    const interval = setInterval(fetchMonthData, 30_000);
    return () => clearInterval(interval);
    return undefined;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
    <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
    <Line type="monotone" dataKey="spent" stroke="#ef4444" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}