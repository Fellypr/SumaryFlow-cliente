"use client";

import { useContext } from "react";
import { SummaryContext } from "../../context/SummaryContext";

export const useSummary = () => {
    return useContext(SummaryContext);
};
