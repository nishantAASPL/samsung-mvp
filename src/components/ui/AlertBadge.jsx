import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const CONFIG = {
  danger:  { bg: 'bg-[#FEF2F2]', border: 'border-[#FCA5A5]', text: 'text-[#DC2626]', Icon: AlertTriangle },
  warning: { bg: 'bg-[#FFFBEB]', border: 'border-[#FDE68A]', text: 'text-[#D97706]', Icon: AlertTriangle },
  success: { bg: 'bg-[#ECFDF5]', border: 'border-[#A7F3D0]', text: 'text-[#059669]', Icon: CheckCircle2  },
  info:    { bg: 'bg-[#EBF0FA]', border: 'border-[#BFDBFE]', text: 'text-[#1428A0]', Icon: Info          },
};

export default function AlertBadge({ type = 'info', label, size = 'md' }) {
  const { bg, border, text, Icon } = CONFIG[type] ?? CONFIG.info;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold rounded border ${bg} ${border} ${text} ${padding}`}>
      <Icon size={size === 'sm' ? 11 : 13} />
      {label}
    </span>
  );
}
