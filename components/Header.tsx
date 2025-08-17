
import React from 'react';
import { BrainCircuitIcon } from './IconComponents';

const Header: React.FC = () => {
    return (
        <header className="bg-brand-secondary border-b border-brand-border shadow-md">
            <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <BrainCircuitIcon className="h-8 w-8 text-brand-accent"/>
                    <h1 className="text-xl lg:text-2xl font-bold text-text-primary tracking-tight">
                        AI Trading Bot Simulator
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
