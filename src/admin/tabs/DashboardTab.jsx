import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaUsers, FaFileAlt, FaGraduationCap, FaBook, FaCoins, FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa';
import { getDashboardStats } from '../api/adminApi';

const DashboardTab = ({ token }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data if token is available (user is authenticated)
    if (token) {
      fetchDashboardStats();
    } else {
      setLoading(false);
      setError('Not authenticated');
    }
  }, [token]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardStats(token);
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard statistics');
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard statistics...</p>
        </div>
      </div>
    );
  }

  if (error === 'Not authenticated') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-slate-600 text-lg">Please log in to view the dashboard</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchDashboardStats}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return <div className="p-6">No data available</div>;
  }

  return (
    <div className="min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">System Overview & Analytics</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Students */}
        <StatCard
          icon={<FaUsers className="text-blue-500" />}
          title="Total Students"
          value={stats.students.total}
          subtitle={`${stats.students.active} Active`}
          bgColor="bg-blue-50"
          borderColor="border-blue-200"
        />

        {/* Total Applications */}
        <StatCard
          icon={<FaFileAlt className="text-purple-500" />}
          title="Applications"
          value={stats.applications.total}
          subtitle={`${stats.applications.pending} Pending`}
          bgColor="bg-purple-50"
          borderColor="border-purple-200"
        />

        {/* Total Alumni */}
        <StatCard
          icon={<FaGraduationCap className="text-green-500" />}
          title="Alumni"
          value={stats.alumni.total}
          subtitle={`${stats.alumni.thisYear} This Year`}
          bgColor="bg-green-50"
          borderColor="border-green-200"
        />

        {/* Active Courses */}
        <StatCard
          icon={<FaBook className="text-yellow-500" />}
          title="Courses"
          value={stats.courses.active}
          subtitle={`of ${stats.courses.total} Total`}
          bgColor="bg-yellow-50"
          borderColor="border-yellow-200"
        />
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <FaCoins className="mr-2 text-amber-500" />
            Financial Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-700">Expected Fees</span>
              <span className="text-lg font-bold text-slate-900">
                KES {(stats.finance.totalExpectedFees || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-700">Collected Fees</span>
              <span className="text-lg font-bold text-green-600">
                KES {(stats.finance.totalCollectedFees || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-700">Pending Fees</span>
              <span className="text-lg font-bold text-red-600">
                KES {(stats.finance.totalPendingFees || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-100 p-4 rounded">
              <span className="text-slate-900 font-semibold">Collection Rate</span>
              <span className="text-2xl font-bold text-blue-600">{stats.finance.collectionRate}%</span>
            </div>
          </div>
        </div>

        {/* Payment Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Payment Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-slate-700">Fully Paid</span>
              </div>
              <span className="text-lg font-bold text-green-600">
                {stats.finance.paymentStatus.fullyPaid}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div className="flex items-center">
                <FaClock className="text-yellow-500 mr-2" />
                <span className="text-slate-700">Partially Paid</span>
              </div>
              <span className="text-lg font-bold text-yellow-600">
                {stats.finance.paymentStatus.partiallPaid}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-100 p-4 rounded">
              <div className="flex items-center">
                <FaTimes className="text-red-500 mr-2" />
                <span className="text-slate-900 font-semibold">Not Paid</span>
              </div>
              <span className="text-lg font-bold text-red-600">
                {stats.finance.paymentStatus.notPaid}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Applications & Students Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Application Status */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Application Status</h2>
          <div className="space-y-4">
            <StatusRow
              label="Pending Applications"
              value={stats.applications.pending}
              color="amber"
            />
            <StatusRow
              label="Admitted Applications"
              value={stats.applications.admitted}
              color="green"
            />
            <StatusRow
              label="Rejected Applications"
              value={stats.applications.rejected}
              color="red"
            />
            <div className="bg-slate-100 p-4 rounded mt-4">
              <p className="text-slate-700">Conversion Rate</p>
              <p className="text-2xl font-bold text-blue-600">{stats.applications.conversionRate}%</p>
            </div>
          </div>
        </div>

        {/* Student Status */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Student Status Distribution</h2>
          <div className="space-y-4">
            <StatusRow
              label="Active Students"
              value={stats.students.active}
              color="blue"
            />
            <StatusRow
              label="Completed Students"
              value={stats.students.completed}
              color="green"
            />
            <StatusRow
              label="Inactive Students"
              value={stats.students.inactive}
              color="gray"
            />
            <StatusRow
              label="Suspended Students"
              value={stats.students.suspended}
              color="red"
            />
          </div>
        </div>
      </div>

      {/* Top Courses */}
      {stats.enrollmentByTopCourses && stats.enrollmentByTopCourses.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <FaBook className="mr-2 text-blue-500" />
            Top Courses by Enrollment
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Course Name</th>
                  <th className="text-right py-3 px-4 text-slate-700 font-semibold">Enrollment</th>
                  <th className="text-right py-3 px-4 text-slate-700 font-semibold">Expected Revenue</th>
                  <th className="text-right py-3 px-4 text-slate-700 font-semibold">Collected</th>
                </tr>
              </thead>
              <tbody>
                {stats.enrollmentByTopCourses.map((course, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">{course._id || 'Unassigned'}</td>
                    <td className="text-right py-3 px-4 text-slate-900 font-semibold">{course.count}</td>
                    <td className="text-right py-3 px-4 text-slate-900">
                      KES {(course.totalFee || 0).toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4 text-green-600 font-semibold">
                      KES {(course.totalCollected || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Admissions */}
      {stats.recentAdmissions && stats.recentAdmissions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <FaUsers className="mr-2 text-green-500" />
            Recent Admissions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Admission Number</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Course</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Admitted Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAdmissions.map((admission, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">{admission.name}</td>
                    <td className="py-3 px-4 text-slate-700 font-mono">{admission.admissionNumber}</td>
                    <td className="py-3 px-4 text-slate-700">{admission.course || 'N/A'}</td>
                    <td className="py-3 px-4 text-slate-700">
                      {new Date(admission.admittedDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="text-right mt-8 text-slate-500 text-sm">
        Last updated: {new Date(stats.generatedAt).toLocaleString()}
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon, title, value, subtitle, bgColor, borderColor }) => (
  <div className={`${bgColor} p-6 rounded-lg border-2 ${borderColor} shadow-md hover:shadow-lg transition-shadow`}>
    <div className="flex justify-between items-start mb-4">
      <div className="text-3xl">{icon}</div>
      <div className="text-right">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-slate-600 text-sm">{subtitle}</p>
      </div>
    </div>
    <p className="text-slate-700 font-semibold">{title}</p>
  </div>
);

// StatusRow Component
const StatusRow = ({ label, value, color }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    amber: 'text-amber-600',
    gray: 'text-gray-600'
  };

  return (
    <div className="flex justify-between items-center pb-3 border-b border-slate-200">
      <span className="text-slate-700">{label}</span>
      <span className={`text-lg font-bold ${colorClasses[color]}`}>{value}</span>
    </div>
  );
};

export default DashboardTab;
