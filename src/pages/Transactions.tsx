import { useState, useEffect } from "react";
import { api } from "@/src/lib/api";
import { formatCurrency, formatDate, cn } from "@/src/lib/utils";
import { toast } from "sonner";
import { Loader2, Smartphone, Zap, Tv, Lightbulb, Search, Filter } from "lucide-react";

export function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await api.user.getTransactions();
        setTransactions(data);
      } catch (error) {
        toast.error("Failed to fetch transactions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(tx => {
    if (filter === "all") return true;
    return tx.type === filter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'airtime': return Smartphone;
      case 'data': return Zap;
      case 'cable': return Tv;
      case 'electricity': return Lightbulb;
      default: return Zap;
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {["all", "funding", "data", "airtime", "cable", "electricity"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all",
                filter === f ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reference</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => {
                const Icon = getIcon(tx.type);
                return (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          tx.type === 'funding' ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{tx.details}</p>
                          <p className="text-xs text-slate-500 capitalize">{tx.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <code className="text-xs font-mono text-slate-500">{tx.reference}</code>
                    </td>
                    <td className="px-8 py-5">
                      <p className={cn(
                        "text-sm font-bold",
                        tx.type === 'funding' ? "text-green-600" : "text-slate-900"
                      )}>
                        {tx.type === 'funding' ? "+" : "-"}{formatCurrency(tx.amount)}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        tx.status === 'success' ? "bg-green-50 text-green-600" : 
                        tx.status === 'failed' ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"
                      )}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs text-slate-500">{formatDate(tx.created_at)}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
