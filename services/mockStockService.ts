
import { StockDataPoint } from '../types';
import { STOCKS } from '../constants';

export const generateMockStockData = (ticker: string): StockDataPoint[] => {
    const data: StockDataPoint[] = [];
    const stockInfo = STOCKS.find(s => s.ticker === ticker);
    let price = stockInfo ? stockInfo.initialPrice : 150;
    const days = 90;

    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i));
        
        // Introduce some volatility and a general trend
        const volatility = (Math.random() - 0.49) * (price * 0.05); // up to 5% daily change
        const trend = (Math.random() - 0.4) * 0.1; // small random trend
        price += volatility + trend;

        // Ensure price doesn't go below a reasonable floor
        if (price < 10) {
            price = 10;
        }

        data.push({
            date: date.toISOString().split('T')[0],
            price: parseFloat(price.toFixed(2)),
        });
    }
    return data;
};


export const fetchStockNews = (ticker: string): string[] => {
    const positiveNews = [
        `${ticker} reports record quarterly earnings, beating analyst expectations.`,
        `New product launch from ${ticker} receives overwhelmingly positive reviews.`,
        `${ticker} announces strategic partnership to expand into new markets.`,
        `Analysts upgrade ${ticker} to "Strong Buy" citing innovation pipeline.`,
    ];

    const negativeNews = [
        `${ticker} faces new regulatory scrutiny over its business practices.`,
        `Key executive at ${ticker} announces unexpected departure.`,
        `Supply chain disruptions are expected to impact ${ticker}'s next quarter results.`,
        `Competitor launches a rival product, threatening ${ticker}'s market share.`,
    ];
    
    const neutralNews = [
        `${ticker} to present at upcoming industry conference.`,
        `Market trends show steady but slow growth in ${ticker}'s sector.`,
        `${ticker} announces minor updates to its flagship product line.`,
    ];

    const allNews = [...positiveNews, ...negativeNews, ...neutralNews];
    
    // Pick 3 random, unique news items
    const shuffled = allNews.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
};
