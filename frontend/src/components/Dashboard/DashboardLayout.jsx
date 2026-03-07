import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Plus, BarChart3, MousePointerClick, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useStoreContext } from '../../contextApi/ContextApi';
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery';
import { Button, GlassCard, GradientBlob, PageTransition, StatsCard, TableSkeleton } from '../ui';
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

  // Calculate stats
  const totalLinks = myShortenUrls?.length || 0;
  const totalClicksCount = totalClicks?.reduce((sum, item) => sum + item.count, 0) || 0;
  const avgClicksPerLink = totalLinks > 0 ? Math.round(totalClicksCount / totalLinks) : 0;

  if (loader || isLoading) {
    return <Loader />;
  }

  return (
    <PageTransition className="min-h-screen pt-20 pb-12">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="w-96 h-96 -top-48 -right-48 opacity-20" color="primary" />
        <GradientBlob className="w-96 h-96 bottom-0 -left-48 opacity-15 animation-delay-2000" color="purple" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white"
            >
              Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-dark-400 mt-1"
            >
              Manage and track your shortened URLs
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => setShortenPopUp(true)}
              icon={Plus}
              size="lg"
            >
              Create New Link
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Total Links"
            value={totalLinks}
            icon={Link2}
          />
          <StatsCard
            title="Total Clicks"
            value={totalClicksCount}
            icon={MousePointerClick}
          />
          <StatsCard
            title="Avg. Clicks per Link"
            value={avgClicksPerLink}
            icon={TrendingUp}
          />
        </div>

        {/* Analytics Chart */}
        <GlassCard className="mb-8" hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600/10 rounded-lg">
                <BarChart3 className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Click Analytics</h2>
                <p className="text-sm text-dark-400">Overview of your link performance</p>
              </div>
            </div>
          </div>

          <div className="h-80 relative">
            {(!totalClicks || totalClicks.length === 0) ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="p-4 bg-dark-800/50 rounded-2xl mb-4">
                  <BarChart3 className="w-12 h-12 text-dark-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No data yet</h3>
                <p className="text-dark-400 text-center max-w-xs">
                  Share your short links to see engagement analytics here
                </p>
              </div>
            ) : (
              <Graph graphData={totalClicks} />
            )}
          </div>
        </GlassCard>

        {/* URL List */}
        <GlassCard hover={false} padding="p-0">
          <div className="p-6 border-b border-dark-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600/10 rounded-lg">
                <Link2 className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Your Links</h2>
                <p className="text-sm text-dark-400">{totalLinks} total links created</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {(!myShortenUrls || myShortenUrls.length === 0) ? (
              <div className="text-center py-12">
                <div className="p-4 bg-dark-800/50 rounded-2xl inline-block mb-4">
                  <Link2 className="w-12 h-12 text-dark-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No links yet</h3>
                <p className="text-dark-400 mb-6">Create your first shortened URL to get started</p>
                <Button onClick={() => setShortenPopUp(true)} icon={Plus}>
                  Create Your First Link
                </Button>
              </div>
            ) : (
              <ShortenUrlList data={myShortenUrls} />
            )}
          </div>
        </GlassCard>
      </div>

      {/* Create URL Modal */}
      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </PageTransition>
  );
};

export default DashboardLayout;
