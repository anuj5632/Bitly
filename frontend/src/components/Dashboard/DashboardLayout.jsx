import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Plus, BarChart3, MousePointerClick, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useStoreContext } from '../../contextApi/ContextApi';
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery';
import { Button, GlassCard as Card, PageTransition, StatsCard } from '../ui';
import Graph from './Graph';
import ShortenPopUp from './ShortenPopUp';
import ShortenUrlList from './ShortenUrlList';
import Loader from '../Loader';

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  const { isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError);
  const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(token, onError);

  function onError() {
    navigate("/error");
  }

  const totalLinks = myShortenUrls?.length || 0;
  const totalClicksCount = totalClicks?.reduce((sum, item) => sum + item.count, 0) || 0;
  const avgClicksPerLink = totalLinks > 0 ? Math.round(totalClicksCount / totalLinks) : 0;

  if (loader || isLoading) {
    return <Loader />;
  }

  return (
    <PageTransition className="min-h-screen relative overflow-hidden bg-surface pt-24 pb-32">
      <div className="fixed inset-0 bg-crosshatch opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12 border-b border-border-base pb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-heading text-4xl font-bold text-white lime-glow"
            >
              Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="font-body text-on-surface-secondary mt-2 uppercase tracking-widest text-xs font-bold"
            >
              The Nocturnal Registry
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              onClick={() => setShortenPopUp(true)}
              variant="primary"
              size="lg"
              className="shadow-md"
            >
              Create New Sketch
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <StatsCard
            title="Total Registry"
            value={totalLinks}
            icon={Link2}
            className="tilted-card"
            style={{ '--tilt': '0.5deg' }}
          />
          <StatsCard
            title="Total Impressions"
            value={totalClicksCount}
            icon={MousePointerClick}
            className="tilted-card"
            style={{ '--tilt': '-0.5deg' }}
          />
          <StatsCard
            title="Efficiency"
            value={avgClicksPerLink}
            icon={TrendingUp}
            className="tilted-card"
            style={{ '--tilt': '0.8deg' }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analytics Chart */}
          <Card className="lg:col-span-2 !bg-surface-card border border-border-base" hover={false} tilt="0deg">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface-secondary border border-border-base rounded-md text-primary">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">Engagement Graph</h2>
                  <p className="font-body text-xs text-on-surface-muted uppercase tracking-widest font-bold">Temporal Analysis</p>
                </div>
              </div>
            </div>

            <div className="h-80 relative">
              {(!totalClicks || totalClicks.length === 0) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
                  <BarChart3 className="w-16 h-16 text-on-surface-muted mb-4" />
                  <h3 className="font-heading text-lg font-bold text-white mb-2">Null Data</h3>
                  <p className="font-body text-on-surface-secondary text-sm">Registry is currently silent.</p>
                </div>
              ) : (
                <Graph graphData={totalClicks} />
              )}
            </div>
          </Card>

          {/* URL List */}
          <Card className="lg:col-span-1 !bg-surface-card border border-border-base" hover={false} padding="p-0" tilt="0deg">
            <div className="p-6 border-b border-border-base bg-surface-secondary/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface rounded-md text-primary">
                  <Link2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-white">The Registry</h2>
                  <p className="font-body text-[10px] text-on-surface-muted uppercase tracking-widest font-bold">{totalLinks} SKETCHES RECORDED</p>
                </div>
              </div>
            </div>

            <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
              {(!myShortenUrls || myShortenUrls.length === 0) ? (
                <div className="text-center py-12">
                  <Link2 className="w-12 h-12 text-on-surface-muted mx-auto mb-4 opacity-30" />
                  <h3 className="font-heading text-lg font-bold text-white mb-4">Empty Canvas</h3>
                  <Button onClick={() => setShortenPopUp(true)} size="sm">
                    Inscribe First Link
                  </Button>
                </div>
              ) : (
                <ShortenUrlList data={myShortenUrls} />
              )}
            </div>
          </Card>
        </div>
      </div>

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </PageTransition>
  );
};

export default DashboardLayout;
