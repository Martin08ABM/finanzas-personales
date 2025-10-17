import dayjs from "dayjs";

// Funciones originales (las que ya tenías)
export const getStartOfWeek = () => dayjs().startOf("week").format("YYYY-MM-DD");
export const getEndOfWeek = () => dayjs().endOf("week").format("YYYY-MM-DD");
export const getStartOfMonth = () => dayjs().startOf("month").format("YYYY-MM-DD");
export const getEndOfMonth = () => dayjs().endOf("month").format("YYYY-MM-DD");
export const getStartOfYear = () => dayjs().startOf("year").format("YYYY-MM-DD");
export const getEndOfYear = () => dayjs().endOf("year").format("YYYY-MM-DD");

// 🆕 Funciones nuevas que devuelven objetos con inicio y fin
// (Porque a veces es más cómodo tener todo en un paquete, como los menús combo 🍔🍟)

export const getCurrentWeekRange = () => ({
  startOfWeek: dayjs().startOf("week"),
  endOfWeek: dayjs().endOf("week")
});

export const getCurrentMonthRange = () => ({
  startOfMonth: dayjs().startOf("month"),
  endOfMonth: dayjs().endOf("month")
});

export const getCurrentYearRange = () => ({
  startOfYear: dayjs().startOf("year"),
  endOfYear: dayjs().endOf("year")
});