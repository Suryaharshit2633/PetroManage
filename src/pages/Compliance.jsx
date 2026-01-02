
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  FaHistory,
  FaArrowLeft,
  FaPlus,
  FaChevronDown,
  FaFileCsv,
  FaFilePdf,
  FaFileExcel,
  FaCode,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaTimes
} from "react-icons/fa";
import Card from "../components/compliance components/Card.jsx";
import ReportForm from "../components/compliance components/ReportForm.jsx";
import ReportsTable from "../components/compliance components/ReportsTable.jsx";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {FileCheck} from 'lucide-react';

// --- EXTERNAL COMPONENT: AuditView ---
// Moving this outside prevents the "input focus loss" bug.
const AuditView = ({
  setView,
  filteredLogs,
  indexOfFirstLog,
  indexOfLastLog,
  searchInput,
  setSearchInput,
  fromDate,
  setFromDate,
  endDate,
  setEndDate,
  showExportDropdown,
  setShowExportDropdown,
  exportData,
  dropdownRef,
  currentLogs,
  currentPage,
  setCurrentPage,
  totalPages,
  logsPerPage
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-2 animate-in fade-in slide-in-from-bottom-4">
      {/* Back Button with inner and outer spacing */}
      <button
        onClick={() => setView("dashboard")}
        className="
          flex items-center gap-2
          px-5 py-3
          text-sm font-medium
          text-white
          bg-emerald-600
          rounded-md
          hover:bg-emerald-700
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1
          transition
          group
          cursor-pointer
          m-1 mb-4
        "
        type="button"
        aria-label="Back to Dashboard"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      {/* Header: Title on the left, Controls on the right — same line, no wrap */}
      <div className="flex items-center justify-between mb-8 gap-6 overflow-x-auto">
        {/* Left: Title */}
        <div className="flex flex-col shrink-0">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <FaHistory className="text-emerald-500 shrink-0" /> Audit Trail History
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 uppercase font-bold tracking-tighter">
            Showing {filteredLogs.length > 0 ? indexOfFirstLog + 1 : 0}-{Math.min(indexOfLastLog, filteredLogs.length)} of {filteredLogs.length} results
          </p>
        </div>

        {/* Right: Controls row — same line, fixed heights, no wrap */}
        <div className="flex items-center gap-3 flex-nowrap shrink-0">
          {/* Search Input */}
          <div className="relative h-11 w-72 shrink-0">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-11 w-full pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-sm"
            />
          </div>

          {/* Date Filters (fixed width to keep row aligned) */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 shadow-sm h-11 w-[360px] shrink-0">
            <div className="flex flex-col px-1 w-1/2">
              <span className="text-[7px] font-black text-slate-400 uppercase">From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="text-[10px] font-bold text-slate-700 bg-transparent outline-none cursor-pointer"
              />
            </div>
            <div className="h-5 w-px bg-slate-100 mx-2" />
            <div className="flex flex-col px-1 w-1/2">
              <span className="text-[7px] font-black text-slate-400 uppercase">To</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-[10px] font-bold text-slate-700 bg-transparent outline-none cursor-pointer"
              />
            </div>
            {(fromDate || endDate) && (
              <button
                onClick={() => {
                  setFromDate("");
                  setEndDate("");
                }}
                className="ml-2 text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                title="Clear dates"
                type="button"
              >
                <FaTimes size={10} />
              </button>
            )}
          </div>

          {/* Export Dropdown Trigger (same height as others) */}
          <div className="relative h-11 shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="h-11 px-6 bg-slate-900 text-white text-[10px] font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg flex items-center gap-3 uppercase cursor-pointer"
              type="button"
            >
              Export Log
              <FaChevronDown className={`transition-transform ${showExportDropdown ? "rotate-180" : ""}`} />
            </button>

            {showExportDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in zoom-in-95 duration-200">
                <button
                  onClick={() => exportData("json")}
                  className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-50"
                  type="button"
                >
                  <FaCode className="text-blue-500" /> JSON
                </button>
                <button
                  onClick={() => exportData("csv")}
                  className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-50"
                  type="button"
                >
                  <FaFileCsv className="text-emerald-500" /> CSV
                </button>
                <button
                  onClick={() => exportData("excel")}
                  className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-50"
                  type="button"
                >
                  <FaFileExcel className="text-green-600" /> Excel
                </button>
                <button
                  onClick={() => exportData("pdf")}
                  className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3"
                  type="button"
                >
                  <FaFilePdf className="text-red-500" /> PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] table-fixed">
            <colgroup>
              <col />                 {/* Report ID */}
              <col className="w-52" />{/* Action Type */}
              <col />                 {/* Previous State */}
              <col />                 {/* New State */}
              <col className="w-44" />{/* Generation Time */}
            </colgroup>
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                <th className="px-6 py-5">Report ID</th>
                <th className="px-6 py-5 text-center">Action Type</th>
                <th className="px-6 py-5">Previous State</th>
                <th className="px-6 py-5">New State</th>
                <th className="px-6 py-5">Generation Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {currentLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-20 text-center text-slate-400 font-bold italic uppercase text-[10px] tracking-widest"
                  >
                    No activity matches your filters.
                  </td>
                </tr>
              ) : (
                currentLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700 text-xs">{log.ReportID}</td>

                    {/* Action Type: fixed size badge, center aligned */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center
                          h-8 w-48
                          px-3
                          rounded-md
                          text-[10px] font-black uppercase
                          whitespace-nowrap
                          ${
                            log.Action.includes("Deleted")
                              ? "bg-red-50 text-red-600"
                              : log.Action.includes("Created")
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`
                        }
                        title={log.Action}
                      >
                        {log.Action}
                      </span>
                    </td>

                    <td className="px-6 py-4 max-w-[150px]">
                      <div className="text-slate-400 italic text-[10px] truncate">{log.OldValue}</div>
                    </td>
                    <td className="px-6 py-4 max-w-[150px]">
                      <div className="text-slate-700 font-bold text-[10px] truncate">{log.NewValue}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 tabular-nums text-[10px] whitespace-nowrap">
                      {log.Timestamp}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredLogs.length > logsPerPage && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-500 uppercase">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-30 hover:bg-emerald-50 hover:text-emerald-600 transition-all cursor-pointer"
                type="button"
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-30 hover:bg-emerald-50 hover:text-emerald-600 transition-all cursor-pointer"
                type="button"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT: Compliance ---
export const Compliance = () => {
  const [view, setView] = useState("dashboard");
  const [showPopup, setShowPopup] = useState(false);
  const [reports, setReports] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  // Filtering & Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [logSearchTerm, setLogSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const logsPerPage = 8;

  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Debounce search logic: Only filter after 300ms of no typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setLogSearchTerm(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    const savedReports = localStorage.getItem("complianceReports");
    const savedLogs = localStorage.getItem("auditLogs");
    if (savedReports) setReports(JSON.parse(savedReports));
    if (savedLogs) setAuditLogs(JSON.parse(savedLogs));

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Optimized Date Parser
  const parseLogDate = useCallback((dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return null;
    const parts = dateStr.split(",")[0].split("/");
    if (parts.length !== 3) return null;
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }, []);

  // Filter Logic: useMemo ensures this doesn't run unnecessarily
  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesSearch =
        !logSearchTerm ||
        Object.values(log).some((val) =>
          String(val).toLowerCase().includes(logSearchTerm.toLowerCase())
        );

      let matchesDate = true;
      if (fromDate || endDate) {
        const logDateObj = parseLogDate(log.Timestamp);
        if (!logDateObj) {
          matchesDate = false;
        } else {
          const lTime = logDateObj.setHours(0, 0, 0, 0);
          if (fromDate) {
            const sTime = new Date(fromDate).setHours(0, 0, 0, 0);
            if (lTime < sTime) matchesDate = false;
          }
          if (endDate) {
            const eTime = new Date(endDate).setHours(0, 0, 0, 0);
            if (lTime > eTime) matchesDate = false;
          }
        }
      }
      return matchesSearch && matchesDate;
    });
  }, [auditLogs, logSearchTerm, fromDate, endDate, parseLogDate]);

  const addAuditLog = (reportId, action, oldValue = "-", newValue = "-") => {
    const newLog = {
      ReportID: reportId || "N/A",
      Action: action,
      OldValue: oldValue,
      NewValue: newValue,
      User: "Admin User",
      Timestamp: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    };

    setAuditLogs((prevLogs) => {
      const updated = [newLog, ...prevLogs];
      localStorage.setItem("auditLogs", JSON.stringify(updated));
      return updated;
    });
  };

  const exportData = (type) => {
    const fileName = `Audit_Log_${new Date().toISOString().split("T")[0]}`;
    const headers = ["Report ID", "Action", "User", "Old Value", "New Value", "Timestamp"];
    const rows = filteredLogs.map((log) => [log.ReportID, log.Action, log.User, log.OldValue, log.NewValue, log.Timestamp]);

    if (type === "json") {
      const dataStr = JSON.stringify(filteredLogs, null, 2);
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const link = document.createElement("a");
      link.setAttribute("href", dataUri);
      link.setAttribute("download", `${fileName}.json`);
      link.click();
    } else if (type === "csv") {
      const worksheet = XLSX.utils.json_to_sheet(filteredLogs);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `${fileName}.csv`);
      link.click();
    } else if (type === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(filteredLogs);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Trail");
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } else if (type === "pdf") {
      const doc = new jsPDF("l", "mm", "a4");
      doc.setFontSize(18);
      doc.text("Compliance Audit Trail History", 14, 15);
      autoTable(doc, {
        startY: 28,
        head: [headers],
        body: rows,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [15, 23, 42] }
      });
      doc.save(`${fileName}.pdf`);
    }
    setShowExportDropdown(false);
  };

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = useMemo(() => filteredLogs.slice(indexOfFirstLog, indexOfLastLog), [filteredLogs, indexOfFirstLog, indexOfLastLog]);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const dynamicDetails = useMemo(() => {
    const stats = { "✅ Overall Compliance": "0%", "🛡️ Average Safety Score": "0", "📋 Pending Reviews": "0", "📅 Upcoming Audits": "0" };
    if (reports.length === 0) return stats;
    const total = reports.length;
    const compliantCount = reports.filter((r) => r.ComplianceStatus === "Compliant").length;
    const totalScore = reports.reduce((acc, r) => acc + Number(r.SafetyScore || 0), 0);
    const pendingCount = reports.filter((r) => r.ComplianceStatus === "Pending Review").length;
    const upcomingCount = reports.filter((r) => {
      if (!r.NextAuditDate) return false;
      const d = new Date(r.NextAuditDate.replace(" at ", " "));
      return d >= new Date().setHours(0, 0, 0, 0);
    }).length;
    return {
      "✅ Overall Compliance": `${Math.round((compliantCount / total) * 100)}%`,
      "🛡️ Average Safety Score": `${Math.round(totalScore / total)}`,
      "📋 Pending Reviews": `${pendingCount}`,
      "📅 Upcoming Audits": `${upcomingCount}`
    };
  }, [reports]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-10 sm:pb-20">
      {view === "dashboard" ? (
        <>
         <div className="w-full pt-4">
          {/* Changed p-4 to py-3 and sm:p-12 to sm:py-6 */}
          <div className="relative overflow-hidden text-white rounded-xl sm:rounded-xl px-4 py-3 sm:px-12 sm:py-7 bg-slate-900 shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-black mb-3 tracking-tight flex items-center gap-3">
                  <FileCheck size={40}/>
                  Compliance <span className="text-emerald-400">&amp;</span> Safety
                </h2>
                <p className="text-slate-400 font-medium text-xs sm:text-base mx-auto pl-14">
                  Real-time asset monitoring and regulatory tracking.
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-8 sm:mt-10 px-4">
            <Card data={dynamicDetails} />
          </div>

          <div className="flex justify-center mt-10 px-4">
            <button
              onClick={() => setShowPopup(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-widest"
              type="button"
            >
              <FaPlus /> Generate New Report
            </button>
          </div>

          <div className="max-w-7xl mx-auto mt-12 sm:mt-16 px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                <div className="h-8 w-1.5 bg-emerald-500 rounded-full" /> Active Reports
              </h2>
              <button
                onClick={() => setView("audit")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all text-[10px] uppercase tracking-widest cursor-pointer shadow-sm"
                type="button"
              >
                <FaHistory /> View Audit Logs
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 overflow-hidden">
              <ReportsTable reports={reports} setReports={setReports} onLogAction={addAuditLog} />
            </div>
          </div>

          {showPopup && (
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4">
              <div className="w-full max-w-2xl animate-in zoom-in duration-300">
                <ReportForm
                  onClose={() => setShowPopup(false)}
                  reports={reports}
                  setReports={setReports}
                  onLogAction={addAuditLog}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <AuditView
          setView={setView}
          filteredLogs={filteredLogs}
          indexOfFirstLog={indexOfFirstLog}
          indexOfLastLog={indexOfLastLog}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          fromDate={fromDate}
          setFromDate={setFromDate}
          endDate={endDate}
          setEndDate={setEndDate}
          showExportDropdown={showExportDropdown}
          setShowExportDropdown={setShowExportDropdown}
          exportData={exportData}
          dropdownRef={dropdownRef}
          currentLogs={currentLogs}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          logsPerPage={logsPerPage}
        />
      )}
    </div>
  );
};
export default Compliance;
