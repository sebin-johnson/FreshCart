import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const isLogin = state === "login";
    const appContext = useAppContext();
    const { setShowUserLogin, setUser } = appContext;
    const axios = appContext.axios;
    const navigate = appContext.navigate;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = isLogin ? '/user/login' : '/user/register';
            const payload = isLogin
                ? { email, password }
                : { name, email, password };

            const { data } = await axios.post(endpoint, payload);

            if (data.success) {
                navigate('/');
                toast.success(isLogin ? 'Login Successful' : 'Registration Successful');
                setUser(data.user);
                setShowUserLogin(false);
            } else {
                toast.error(data.message || 'Something went wrong.');
            }
        } catch (error) {
            const message = error?.response?.data?.message || error.message || 'Something went wrong!';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 z-30 flex items-center justify-center bg-white text-sm px-4 py-12' onClick={() => setShowUserLogin(false)}>
            <div className="flex md:w-[800px] w-full bg-white shadow-lg rounded-lg overflow-hidden" onClick={(e) => { e.stopPropagation() }}>
                <div className="hidden md:block w-1/2">
                    <img className="h-full w-full object-cover" src={assets.login_banner} alt="leftSideImage" />
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                    <form className="w-full max-w-sm" onSubmit={onSubmitHandler}>
                        <h2 className="text-3xl font-semibold text-gray-900 text-center">
                            <span className="text-green-600">User</span> {isLogin ? "Login" : "Sign Up"}
                        </h2>

                        <p className="text-sm text-gray-500/90 text-center mt-2">
                            {isLogin ? "Welcome back! Please log in to continue" : "Create your account to get started"}
                        </p>

                        <div className="flex items-center w-full my-5">
                            <div className="flex-grow h-px bg-gray-300/90"></div>
                            <span className="px-2 whitespace-nowrap text-sm text-gray-500/90">
                                or sign {isLogin ? "in" : "up"} with email
                            </span>
                            <div className="flex-grow h-px bg-gray-300/90"></div>
                        </div>


                        {!isLogin && (
                            <div className="flex items-center my-2 mt-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.33 0-10 1.667-10 5v3h20v-3c0-3.333-6.67-5-10-5z"
                                        stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="w-full outline-none bg-transparent py-2.5"
                                    type="text"
                                    placeholder="Name"
                                    required
                                />
                            </div>

                        )}
                        <div className="flex items-center my-2 mt-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="w-full outline-none bg-transparent py-2.5"
                                type="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="flex items-center mt-4 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
                            </svg>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="w-full outline-none bg-transparent py-2.5"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mb-3 bg-green-500 hover:bg-green-600/90 transition py-2.5 rounded text-white font-medium"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
                        </button>

                        <p className="text-sm text-gray-500/90 text-center mt-4 ">
                            {isLogin ? (
                                <>Don't have an account? <button type="button" onClick={() => setState("signup")} className="text-indigo-500 hover:underline cursor-pointer" style={{ textDecoration: 'none' }}>Sign up</button></>
                            ) : (
                                <>Already have an account? <button type="button" onClick={() => setState("login")} className="text-indigo-500 hover:underline cursor-pointer" style={{ textDecoration: 'none' }}>Login</button></>
                            )}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;


