import React from 'react';
import { Stock } from './types';
import { AppleIcon, GoogleIcon, TeslaIcon, AmazonIcon, MetaIcon } from './components/IconComponents';

export const STOCKS: Stock[] = [
    { ticker: 'AAPL', name: 'Apple Inc.', icon: <AppleIcon />, initialPrice: 170 },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', icon: <GoogleIcon />, initialPrice: 140 },
    { ticker: 'TSLA', name: 'Tesla, Inc.', icon: <TeslaIcon />, initialPrice: 250 },
    { ticker: 'AMZN', name: 'Amazon.com, Inc.', icon: <AmazonIcon />, initialPrice: 135 },
    { ticker: 'META', name: 'Meta Platforms, Inc.', icon: <MetaIcon />, initialPrice: 300 },
];