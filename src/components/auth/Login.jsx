import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      console.log("Logged in user:", result.user);

      // Go to Projects after successful login
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold">
            QA Management System
          </h1>

          <p className="mt-2 text-slate-500">
            Sign in to continue
          </p>

        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >

          <span className="text-lg font-bold">
            G
          </span>

          Continue with Google

        </button>

      </div>

    </div>
  );
}

export default Login;