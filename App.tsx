
import React, { useState, useEffect, useCallback } from 'react';
import { Stock, Portfolio, Trade, AIAnalysis, StockDataPoint } from './types';
import { STOCKS } from './constants';
import { getTradingRecommendation } from './services/geminiService';
import { generateMockStockData, fetchStockNews } from './services/mockStockService';
import Header from './components/Header';
import StockSelector from './components/StockSelector';
import PriceChart from './components/PriceChart';
import AIPanel from './components/AIPanel';
import PortfolioComponent from './components/Portfolio';
import TradeControls from './components/TradeControls';

const App: React.FC = () => {
    const [selectedStock, setSelectedStock] = useState<Stock>(STOCKS[0]);
    const [stockData, setStockData] = useState<StockDataPoint[]>([]);
    const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [portfolio, setPortfolio] = useState<Portfolio>({
        cash: 100000,
        holdings: [],
        totalValue: 100000,
    });

    const updateStockData = useCallback(() => {
        const data = generateMockStockData(selectedStock.ticker);
        setStockData(data);
        setAiAnalysis(null); // Reset analysis when stock changes
    }, [selectedStock]);

    useEffect(() => {
        updateStockData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStock]);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setAiAnalysis(null);
        try {
            const news = fetchStockNews(selectedStock.ticker);
            const recommendation = await getTradingRecommendation(selectedStock.name, stockData, news);
            setAiAnalysis(recommendation);
        } catch (error) {
            console.error("Error getting AI analysis:", error);
            setAiAnalysis({
                recommendation: 'ERROR',
                confidence: 0,
                rationale: "Failed to get analysis. Check console for details.",
            });
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const calculatePortfolioValue = useCallback((holdings: { ticker: string; shares: number; }[], cash: number) => {
        // This is a simplified calculation. A real app would fetch current prices for all holdings.
        // For this simulator, we only re-calculate based on the currently selected stock's latest price.
        const currentPrice = stockData.length > 0 ? stockData[stockData.length - 1].price : 0;
        
        const holdingsValue = holdings.reduce((acc, holding) => {
            if (holding.ticker === selectedStock.ticker) {
                return acc + (holding.shares * currentPrice);
            }
            // In a real app, you'd fetch prices for other tickers. Here we'll just use their last known value which is not ideal but works for this scope.
            const holdingStock = STOCKS.find(s => s.ticker === holding.ticker);
            const lastKnownPrice = holdingStock ? holdingStock.initialPrice : 0; // Fallback to an initial price
            return acc + (holding.shares * lastKnownPrice)
        }, 0);

        return cash + holdingsValue;
    }, [stockData, selectedStock]);

    const handleTrade = (trade: Trade) => {
        const currentPrice = stockData.length > 0 ? stockData[stockData.length - 1].price : 0;
        if (currentPrice === 0) return;

        const tradeCost = trade.shares * currentPrice;
        let newCash = portfolio.cash;
        const newHoldings = [...portfolio.holdings];
        const existingHoldingIndex = newHoldings.findIndex(h => h.ticker === trade.ticker);

        if (trade.type === 'BUY') {
            if (portfolio.cash < tradeCost) {
                alert("Not enough cash to complete this transaction.");
                return;
            }
            newCash -= tradeCost;
            if (existingHoldingIndex > -1) {
                newHoldings[existingHoldingIndex].shares += trade.shares;
            } else {
                newHoldings.push({ ticker: trade.ticker, shares: trade.shares });
            }
        } else { // SELL
            if (existingHoldingIndex > -1) {
                const existingShares = newHoldings[existingHoldingIndex].shares;
                if (existingShares < trade.shares) {
                    alert("You don't own enough shares to sell.");
                    return;
                }
                newCash += tradeCost;
                newHoldings[existingHoldingIndex].shares -= trade.shares;
                if (newHoldings[existingHoldingIndex].shares === 0) {
                    newHoldings.splice(existingHoldingIndex, 1);
                }
            } else {
                alert("You don't own any shares of this stock.");
                return;
            }
        }
        
        setPortfolio(prev => ({
            ...prev,
            cash: newCash,
            holdings: newHoldings,
            totalValue: calculatePortfolioValue(newHoldings, newCash),
        }));
    };

    const currentPrice = stockData.length > 0 ? stockData[stockData.length - 1].price : 0;

    return (
        <div className="min-h-screen bg-brand-primary text-text-primary font-sans">
            <Header />
            <main className="container mx-auto p-4 lg:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main content area */}
                    <div className="lg:col-span-9 space-y-6">
                        <StockSelector
                            stocks={STOCKS}
                            selectedStock={selectedStock}
                            onSelectStock={(stock) => setSelectedStock(stock)}
                            currentPrice={currentPrice}
                        />
                        <div className="bg-brand-secondary rounded-lg shadow-lg p-4 border border-brand-border">
                            <PriceChart data={stockData} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-3 space-y-6">
                        <AIPanel
                            analysis={aiAnalysis}
                            isLoading={isAnalyzing}
                            onAnalyze={handleAnalyze}
                        />
                        <TradeControls
                            stock={selectedStock}
                            onTrade={handleTrade}
                            portfolio={portfolio}
                            currentPrice={currentPrice}
                        />
                         <PortfolioComponent portfolio={portfolio} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
