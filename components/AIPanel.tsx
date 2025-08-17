
import React from 'react';
import { AIAnalysis } from '../types';
import { BrainCircuitIcon, SparklesIcon } from './IconComponents';

interface AIPanelProps {
    analysis: AIAnalysis | null;
    isLoading: boolean;
    onAnalyze: () => void;
}

const AIPanel: React.FC<AIPanelProps> = ({ analysis, isLoading, onAnalyze }) => {
    const getRecommendationClasses = (rec: AIAnalysis['recommendation'] | undefined) => {
        switch (rec) {
            case 'BUY':
                return 'bg-positive text-white';
            case 'SELL':
                return 'bg-negative text-white';
            case 'HOLD':
                return 'bg-yellow-500 text-gray-900';
            case 'ERROR':
                return 'bg-gray-500 text-white';
            default:
                return 'bg-gray-600 text-text-primary';
        }
    };
    
    return (
        <div className="bg-brand-secondary rounded-lg shadow-lg p-5 border border-brand-border h-full flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
                <SparklesIcon className="h-6 w-6 text-brand-accent"/>
                <h3 className="text-xl font-bold text-text-primary">Gemini AI Analysis</h3>
            </div>
            
            <div className="flex-grow">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 animate-pulse">
                        <BrainCircuitIcon className="h-12 w-12 text-gray-500"/>
                        <p className="text-text-secondary">Analyzing market data...</p>
                         <div className="w-full space-y-3">
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                        </div>
                    </div>
                ) : analysis ? (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-text-secondary mb-1">Recommendation</p>
                            <div className={`px-4 py-2 rounded-md text-center font-bold text-lg ${getRecommendationClasses(analysis.recommendation)}`}>
                                {analysis.recommendation}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary mb-1">Confidence</p>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div className="bg-brand-accent h-2.5 rounded-full" style={{ width: `${analysis.confidence * 100}%` }}></div>
                            </div>
                             <p className="text-right text-xs text-text-secondary mt-1">{(analysis.confidence * 100).toFixed(0)}%</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary mb-1">Rationale</p>
                            <p className="text-sm bg-brand-primary p-3 rounded-md border border-brand-border">
                                {analysis.rationale}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full">
                        <BrainCircuitIcon className="h-12 w-12 text-gray-500 mb-4"/>
                        <p className="text-text-secondary">Click "Analyze" to get an AI-powered trading recommendation.</p>
                    </div>
                )}
            </div>

            <button
                onClick={onAnalyze}
                disabled={isLoading}
                className="w-full mt-6 bg-brand-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Analyzing...</span>
                    </>
                ) : (
                     <>
                        <SparklesIcon className="h-5 w-5"/>
                        <span>Analyze with Gemini</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default AIPanel;
