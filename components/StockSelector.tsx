
import React from 'react';
import { Stock } from '../types';

interface StockSelectorProps {
    stocks: Stock[];
    selectedStock: Stock;
    onSelectStock: (stock: Stock) => void;
    currentPrice: number;
}

const StockSelector: React.FC<StockSelectorProps> = ({ stocks, selectedStock, onSelectStock, currentPrice }) => {
    return (
        <div className="bg-brand-secondary rounded-lg shadow-lg p-4 border border-brand-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <div className="flex-shrink-0 text-3xl">
                        {selectedStock.icon}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary">{selectedStock.name} ({selectedStock.ticker})</h2>
                        <p className="text-sm text-text-secondary">Select a stock to analyze</p>
                    </div>
                </div>
                 <div className="text-right">
                    <p className="text-3xl font-semibold text-text-primary">${currentPrice.toFixed(2)}</p>
                    <p className="text-sm text-text-secondary">Current Price</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-brand-border flex flex-wrap gap-2">
                {stocks.map((stock) => (
                    <button
                        key={stock.ticker}
                        onClick={() => onSelectStock(stock)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center space-x-2 ${
                            selectedStock.ticker === stock.ticker
                                ? 'bg-brand-accent text-white shadow'
                                : 'bg-gray-700 hover:bg-gray-600 text-text-secondary'
                        }`}
                    >
                        {stock.icon}
                        <span>{stock.ticker}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StockSelector;
