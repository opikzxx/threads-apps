import React from 'react';
import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="p-4">
        <h1 className="text-2xl md:text-4xl font-bold md:font-extrabold mb-2">
          Punya Pertanyaan?
        </h1>
        <Link to="/add">
          <button type="button" className="bg-black text-white rounded-full p-2 hover:bg-slate-400 hover:text-black">
            Tanya Sekarang
          </button>
        </Link>
      </div>
    </div>
  );
}
