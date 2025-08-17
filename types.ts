
import React from 'react';

export interface Stock {
    ticker: string;
    name: string;
    icon: React.ReactNode;
    initialPrice: number;
}

export interface StockDataPoint {
    date: string;
    price: number;
}

export interface Holding {
    ticker: string;
    shares: number;
}

export interface Portfolio {
    cash: number;
    holdings: Holding[];
    totalValue: number;
}

export interface Trade {
    ticker: string;
    shares: number;
    type: 'BUY' | 'SELL';
}

export interface AIAnalysis {
    recommendation: 'BUY' | 'SELL' | 'HOLD' | 'ERROR';
    confidence: number;
    rationale: string;
}
