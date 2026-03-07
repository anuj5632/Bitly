import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  MousePointerClick,
  ChevronDown,
  BarChart3,
  QrCode,
  Trash2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../../api/api';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Button } from '../ui';
import Graph from './Graph';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL?.replace(/^https?:\/\//, "") || "localhost";
  const fullShortUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const fetchAnalytics = async () => {
    if (analyticsData.length > 0) return; // Already fetched
    
    setLoading(true);
    try {
      // Use dynamic date range: last 30 days to today
      const endDate = new Date();
      endDate.setHours(23, 59, 59, 0); // End of today
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      startDate.setHours(0, 0, 0, 0); // Start of day 30 days ago
      
      const formatDate = (date) => {
        const pad = (n) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      };
      
      const { data } = await api.get(
        `/api/url/analytics/${shortUrl}?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Analytics response:", data);
      // Transform object to array format for Graph component
      let transformedData = [];
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        transformedData = Object.keys(data).map((key) => ({
          clickDate: key,
          count: data[key],
        }));
      } else if (Array.isArray(data)) {
        transformedData = data;
      }
      console.log("Transformed data:", transformedData);
      setAnalyticsData(transformedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAnalytics = () => {
    if (!showAnalytics) {
      fetchAnalytics();
    }
    setShowAnalytics(!showAnalytics);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800/30 backdrop-blur-sm border border-dark-700/50 rounded-2xl overflow-hidden hover:border-dark-600/50 transition-all duration-300"
    >
      {/* Main Content */}
      <div className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* URL Info */}
          <div className="flex-1 min-w-0">
            {/* Short URL */}
            <div className="flex items-center gap-2 mb-2">
              <Link
                to={`/s/${shortUrl}`}
                target="_blank"
                className="text-primary-400 hover:text-primary-300 font-medium flex items-center gap-2 transition-colors"
              >
                <span className="truncate">{subDomain}/s/{shortUrl}</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </Link>
            </div>
            
            {/* Original URL */}
            <p className="text-dark-400 text-sm truncate mb-3">
              {originalUrl}
            </p>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <MousePointerClick className="w-4 h-4" />
                <span className="font-medium">{clickCount}</span>
                <span className="text-dark-400">
                  {clickCount === 1 ? 'click' : 'clicks'}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-dark-400">
                <Calendar className="w-4 h-4" />
                <span>{dayjs(createdDate).format("MMM DD, YYYY")}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl
                transition-all duration-300
                ${isCopied 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-dark-700/50 text-dark-200 hover:text-white border border-dark-600 hover:border-primary-500/50'
                }
              `}
            >
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleAnalytics}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl
                transition-all duration-300
                ${showAnalytics 
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30' 
                  : 'bg-dark-700/50 text-dark-200 hover:text-white border border-dark-600 hover:border-primary-500/50'
                }
              `}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAnalytics ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Analytics Panel */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-dark-700/50 p-5 bg-dark-900/30">
              <div className="h-64 relative">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-dark-400 text-sm">Loading analytics...</p>
                    </div>
                  </div>
                ) : analyticsData.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="p-3 bg-dark-800/50 rounded-xl mb-3">
                      <BarChart3 className="w-8 h-8 text-dark-500" />
                    </div>
                    <h4 className="text-white font-medium mb-1">No analytics yet</h4>
                    <p className="text-dark-400 text-sm text-center max-w-xs">
                      Share this link to start seeing engagement data
                    </p>
                  </div>
                ) : (
                  <Graph graphData={analyticsData} type="bar" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShortenItem;
