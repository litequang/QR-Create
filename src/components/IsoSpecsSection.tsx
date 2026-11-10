import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, Compass, Sparkles } from 'lucide-react';

export const IsoSpecsSection: React.FC = () => {
  return (
    <section id="specs" className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/60 rounded-lg text-indigo-600 dark:text-indigo-400">
          <BookOpen className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Tài liệu kỹ thuật & Tiêu chuẩn Quốc tế ISO/IEC 18004
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Card 1 */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Compass className="w-4 h-4 text-blue-500" />
            <span>Tỷ lệ vàng Finder Pattern 1:1:3:1:1</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            3 cụm nhận diện tại các góc sử dụng tỷ lệ module đen-trắng 1:1:3:1:1 theo mọi góc cắt 360 độ. Thuật toán xử lý ảnh trên điện thoại dựa vào tỷ lệ bất biến này để định vị mã QR trong khung hình camera dưới 10ms.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Đại số Reed-Solomon & Phục hồi lỗi</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Mã sửa sai trường Galois GF(256) cho phép phục hồi chính xác dữ liệu gốc ngay cả khi mã bị rách, xước hoặc bị che phủ bởi logo thương hiệu (lên đến 30% diện tích bề mặt ở cấp độ H).
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Mặt nạ quang học (Data Masking)</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            ISO/IEC 18004 áp dụng 8 mẫu mặt nạ XOR khác nhau để phá vỡ các khối module đồng nhất quá lớn, đảm bảo tỷ lệ bit đen/trắng luôn dao động quanh mức 50% nhằm tránh hiện tượng bão hòa cảm biến camera.
          </p>
        </div>
      </div>
    </section>
  );
};
