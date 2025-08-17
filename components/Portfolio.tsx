
import React from 'react';
import { Portfolio as PortfolioType } from '../types';
import { STOCKS } from '../constants';
import { WalletIcon, ChartBarIcon } from './IconComponents';


const Portfolio: React.FC<{ portfolio: PortfolioType }> = ({ portfolio }) => {
    return (
        <div className="bg-brand-secondary rounded-lg shadow-lg p-5 border border-brand-border">
            <h3 className="text-xl font-bold text-text-primary mb-4">My Portfolio</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center bg-brand-primary p-3 rounded-lg">
                    <span className="text-text-secondary flex items-center"><WalletIcon className="h-5 w-5 mr-2"/> Cash</span>
                    <span className="font-mono text-lg text-text-primary">${portfolio.cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center bg-brand-primary p-3 rounded-lg">
                    <span className="text-text-secondary flex items-center"><ChartBarIcon className="h-5 w-5 mr-2"/> Total Value</span>
                    <span className="font-mono text-lg font-bold text-brand-accent">${portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>

            <div className="mt-6">
                <h4 className="text-lg font-semibold text-text-primary mb-3">Holdings</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {portfolio.holdings.length > 0 ? (
                        portfolio.holdings.map(holding => {
                            const stockInfo = STOCKS.find(s => s.ticker === holding.ticker);
                            return (
                                <div key={holding.ticker} className="flex justify-between items-center text-sm p-2 rounded-md bg-gray-800/50">
                                    <span className="font-bold flex items-center space-x-2">
                                        {stockInfo?.icon}
                                        <span>{holding.ticker}</span>
                                    </span>
                                    <span className="text-text-secondary">{holding.shares} shares</span>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-sm text-text-secondary text-center py-4">No holdings yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
