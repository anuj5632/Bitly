import React, { useState } from 'react';
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
} from 'lucide-react';
import { Link } from 'react-router-dom';

import api from '../../api/api';
import { useStoreContext } from '../../contextApi/ContextApi';
import Graph from './Graph';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
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
    if (analyticsData.length > 0) return;
    
    setLoading(true);
    try {
      const endDate = new Date();
      endDate.setHours(23, 59, 59, 0);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      startDate.setHours(0, 0, 0, 0);
      
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
      
      let transformedData = [];
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        transformedData = Object.keys(data).map((key) => ({
          clickDate: key,
          count: data[key],
        }));
      } else if (Array.isArray(data)) {
        transformedData = data;
      }
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
      className="bg-surface-secondary/50 border border-border-base rounded-md overflow-hidden hover:border-primary/30 transition-all duration-300 tilted-card"
      style={{ '--tilt': '-0.5deg' }}
    >
      <div className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Link
                to={`/s/${shortUrl}`}
                target="_blank"
                className="text-primary hover:text-primary-hover font-heading font-bold flex items-center gap-2 transition-colors lime-glow"
              >
                <span className="truncate">{subDomain}/s/{shortUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </Link>
            </div>
            
            <p className="text-on-surface-muted text-xs truncate mb-4 font-body opacity-80">
              {originalUrl}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2 text-primary">
                <MousePointerClick className="w-3.5 h-3.5" />
                <span>{clickCount} IMPS</span>
              </div>
              
              <div className="flex items-center gap-2 text-on-surface-muted">
                <Calendar className="w-3.5 h-3.5" />
                <span>{dayjs(createdDate).format("MMM DD, YYYY")}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-4 border-t border-border-base/50 mt-2">
            <button
              onClick={handleCopy}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest
                transition-all duration-300 border
                ${isCopied 
                  ? 'bg-primary text-black border-primary' 
                  : 'bg-surface border-border-base text-on-surface-secondary hover:text-primary hover:border-primary'
                }
              `}
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Recorded' : 'Copy Path'}</span>
            </button>
            
            <button
              onClick={handleToggleAnalytics}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest
                transition-all duration-300 border
                ${showAnalytics 
                  ? 'bg-surface-card border-primary text-primary' 
                  : 'bg-surface border-border-base text-on-surface-secondary hover:text-on-surface'
                }
              `}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAnalytics ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-surface-secondary"
          >
            <div className="border-t border-border-base p-6">
              <div className="h-48 relative">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : analyticsData.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-muted">No analytics data recorded</p>
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
