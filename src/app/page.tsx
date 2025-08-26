'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image'


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    setError('');
    setLoading(true);
    console.log('Login submitted:', { email, password });
    
  try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // if (!response.ok) {
      //   setError(data.message || 'เกิดข้อผิดพลาดในการล็อกอิน');
      // } else {
      //   console.log('Login success:', data);
      //   // ตัวอย่าง: redirect หรือเก็บ token
      //   // router.push('/dashboard')
      // }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-blue-600 to-green-500">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

        <div className="flex justify-center mb-6">
          
            <Image
              src="/AW_logo_softway.png"  // ไฟล์รูปต้องอยู่ใน public folder
              alt="Logo ของเรา"
              width={200}      // ความกว้าง
              height={200}     // ความสูง
            />
          
        </div>

        {/* <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2> */}

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              />
               {error && <p style={{ color: 'red' }}>{error}</p>}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 font-medium"
              >
                {showPassword ? 'Hide' : 'Show'}
                
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-pink-500 hover:underline">
              ลืมรหัสผ่าน?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-green-600 hover:to-blue-600 active:scale-95 transition transform"
          >
            Login
          </button>
        </form>

        {/* <p className="text-center text-gray-500 mt-6">
          ไม่ได้สมัครสมาชิก?{' '}
          <a href="#" className="text-pink-500 hover:underline">
            สมัครเลย
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
