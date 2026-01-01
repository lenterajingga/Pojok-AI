
import React, { useState } from 'react';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex flex-col items-center">
      {/* Dashboard / Info Section */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-slate-200">
        <div className="bg-indigo-700 p-8 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <i className="fas fa-robot text-8xl"></i>
          </div>
          <h1 className="text-3xl font-bold mb-2">Blogger AI Assistant</h1>
          <p className="text-indigo-100 max-w-xl">
            Tingkatkan interaksi blog Anda dengan asisten cerdas yang didukung oleh Gemini AI.
            Widget ini siap dipasang di Blogger atau platform lainnya.
          </p>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex-1 min-w-[200px] p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-indigo-600 mb-2"><i className="fas fa-bolt"></i></div>
              <h4 className="font-semibold text-sm mb-1">Cepat & Ringan</h4>
              <p className="text-xs text-slate-500">Menggunakan model Gemini 3 Flash untuk respon instan.</p>
            </div>
            <div className="flex-1 min-w-[200px] p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-green-600 mb-2"><i className="fas fa-check-circle"></i></div>
              <h4 className="font-semibold text-sm mb-1">Ready to Embed</h4>
              <p className="text-xs text-slate-500">Didesain khusus untuk layout blog yang responsif.</p>
            </div>
            <div className="flex-1 min-w-[200px] p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-amber-600 mb-2"><i className="fas fa-memory"></i></div>
              <h4 className="font-semibold text-sm mb-1">Context Aware</h4>
              <p className="text-xs text-slate-500">Mengingat percakapan sebelumnya dalam sesi lokal.</p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-code text-indigo-600"></i>
                Cara Memasang di Blogger
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-sm text-slate-600">Buka Dashboard Blogger Anda, pilih menu <strong>Tata Letak (Layout)</strong>.</p>
                </div>
                <div className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-sm text-slate-600">Klik <strong>Tambahkan Gadget</strong> di bagian Sidebar atau Footer.</p>
                </div>
                <div className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-sm text-slate-600">Pilih <strong>HTML/JavaScript</strong>.</p>
                </div>
                <div className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-2">Salin kode <code>iframe</code> berikut (Gunakan URL aplikasi ini setelah Anda melakukan deploy):</p>
                    <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                      <code className="text-xs text-indigo-300">
                        {`<iframe 
  src="${window.location.href}" 
  style="position:fixed; bottom:0; right:0; width:100%; height:100%; border:none; z-index:9999; pointer-events:none;"
  allow="microphone"
></iframe>`}
                      </code>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 italic">
                      Catatan: Sesuaikan gaya iframe agar tidak menutupi konten blog Anda kecuali saat chat dibuka.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        
        <div className="bg-slate-50 border-t border-slate-200 p-6 flex justify-between items-center">
          <div className="text-sm text-slate-500">
            Dibuat dengan ❤️ untuk komunitas Blogger
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fab fa-github"></i></a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="text-center animate-bounce">
        <p className="text-slate-500 text-sm mb-2">Lihat Demo di Pojok Kanan Bawah!</p>
        <i className="fas fa-chevron-down text-slate-300"></i>
      </div>

      {/* The Actual Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;
