export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111]">
      <div className="bg-white p-10 rounded-[40px] w-full max-w-md">
        <h2 className="text-3xl font-serif mb-6 text-center">Welcome Back</h2>
        <input type="email" placeholder="Email" className="w-full p-4 mb-4 border rounded-full bg-gray-50" />
        <input type="password" placeholder="Password" className="w-full p-4 mb-6 border rounded-full bg-gray-50" />
        <button className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest">Login</button>
        <p className="mt-4 text-center text-sm text-gray-500">Forgot Password?</p>
      </div>
    </div>
  );
}