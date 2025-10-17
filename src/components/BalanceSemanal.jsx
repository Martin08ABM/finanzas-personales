import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "../lib/supabase";
import { getCurrentWeekRange } from "../lib/dateUtils";
import { getLocalTransactionsForRange } from "../assets/localSync";

export default function BalanceSemanal() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWeekData = async () => {
      const { startOfWeek, endOfWeek } = getCurrentWeekRange();
      const { data, error } = await supabase
        .from("transactions")
        .select("amount, category, created_at")
        .gte("created_at", startOfWeek.format("YYYY-MM-DD"))
        .lte("created_at", endOfWeek.format("YYYY-MM-DD"));
      
      if (error) {
        console.error("Error fetching week data:", error);
      }

      // Merge server data with local transactions saved optimistically
      const local = getLocalTransactionsForRange(startOfWeek.format('YYYY-MM-DD'), endOfWeek.format('YYYY-MM-DD')) || [];
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

      const chartData = Object.entries(grouped).map(([date, val]) => ({
        date,
        income: val.income,
        spent: val.spent,
      }));

      setData(chartData);
    };

    fetchWeekData();

    // If you want periodic refresh, uncomment the setInterval below.
    const interval = setInterval(fetchWeekData, 30_000);
    return () => clearInterval(interval);
    return undefined;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" stackId="a" fill="#10B981" />
        <Bar dataKey="spent" stackId="a" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
}