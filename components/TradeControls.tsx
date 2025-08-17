
import React, { useState } from 'react';
import { Stock, Trade, Portfolio } from '../types';
import { ArrowDownIcon, ArrowUpIcon } from './IconComponents';

interface TradeControlsProps {
    stock: Stock;
    onTrade: (trade: Trade) => void;
    portfolio: Portfolio;
    currentPrice: number;
}

const TradeControls: React.FC<TradeControlsProps> = ({ stock, onTrade, portfolio, currentPrice }) => {
    const [shares, setShares] = useState<number>(1);

    const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setShares(isNaN(value) || value < 1 ? 1 : value);
    };

    const handleBuy = () => {
        if (shares > 0) {
            onTrade({ ticker: stock.ticker, shares, type: 'BUY' });
        }
    };

    const handleSell = () => {
        if (shares > 0) {
            onTrade({ ticker: stock.ticker, shares, type: 'SELL' });
        }
    };

    const cost = shares * currentPrice;
    const canBuy = portfolio.cash >= cost;
    const currentHolding = portfolio.holdings.find(h => h.ticker === stock.ticker);
    const canSell = currentHolding ? currentHolding.shares >= shares : false;

    return (
        <div className="bg-brand-secondary rounded-lg shadow-lg p-5 border border-brand-border">
            <h3 className="text-xl font-bold text-text-primary mb-4">Trade {stock.ticker}</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="shares" className="block text-sm font-medium text-text-secondary mb-1">Shares</label>
                    <input
                        type="number"
                        id="shares"
                        name="shares"
                        min="1"
                        value={shares}
                        onChange={handleSharesChange}
                        className="w-full bg-brand-primary border border-brand-border text-text-primary rounded-lg p-2 focus:ring-brand-accent focus:border-brand-accent"
                    />
                </div>
                <div className="text-center bg-gray-900/50 p-2 rounded-md">
                    <p className="text-sm text-text-secondary">Estimated Cost</p>
                    <p className="font-mono text-lg text-text-primary">${cost.toFixed(2)}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleBuy}
                        disabled={!canBuy || currentPrice === 0}
                        className="w-full flex items-center justify-center space-x-2 bg-positive/90 text-white font-bold py-3 px-4 rounded-lg hover:bg-positive transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                       <ArrowUpIcon className="h-5 w-5" />
                       <span>Buy</span>
                    </button>
                    <button
                        onClick={handleSell}
                        disabled={!canSell || currentPrice === 0}
                        className="w-full flex items-center justify-center space-x-2 bg-negative/90 text-white font-bold py-3 px-4 rounded-lg hover:bg-negative transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        <ArrowDownIcon className="h-5 w-5" />
                        <span>Sell</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TradeControls;
