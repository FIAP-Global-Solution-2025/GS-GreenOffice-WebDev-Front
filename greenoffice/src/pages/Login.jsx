// pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { professionalsData } from '../data/professionalsData';

const Login = ({ darkMode, onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Limpar erro do campo quando usuário começar a digitar
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulação de login
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Aqui você integraria com sua API de autenticação
            console.log('Login attempt:', formData);
            // Simulando login bem-sucedido
            const user = professionalsData.find((p) => {
                return formData.email === p.email
            })

            if (onLogin && user) {
                onLogin({
                    ...user
                });
                navigate('/');
            }else 
                throw new Error("Email ou senha incorretos")

        } catch (error) {
            setErrors({ submit: 'Erro ao fazer login. Tente novamente.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login com ${provider}`);
        // Integração com OAuth aqui
    };

    const inputClasses = `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${darkMode
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
        } ${errors.email || errors.password ? 'border-red-500' : ''}`;

    const buttonClasses = `w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${darkMode
        ? 'bg-green-600 hover:bg-green-700 text-white'
        : 'bg-green-500 hover:bg-green-600 text-white'
        } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`;

    return (
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r rounded-xl flex items-center justify-center">
                            <img src="/logo.png" className="w-10 h-10 md:w-12 md:h-12" />
                        </div>
                        <h1 className="text-3xl font-bold">GreenOffice</h1>
                    </Link>
                    <h2 className={`mt-6 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Entre na sua conta
                    </h2>
                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Acesse a rede profissional do futuro
                    </p>
                </div>

                {/* Card do Formulário */}
                <div className={`rounded-2xl shadow-xl border p-8 ${darkMode ? 'bg-gray-800 border-green-700' : 'bg-white border-gray-200'
                    }`}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClasses}
                                placeholder="seu@email.com"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Senha */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Senha
                                </label>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                className={inputClasses}
                                placeholder="Sua senha"
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>


                        {/* Erro de submit */}
                        {errors.submit && (
                            <div className={`p-3 rounded-lg ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'
                                }`}>
                                {errors.submit}
                            </div>
                        )}

                        {/* Botão de Login */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={buttonClasses}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Entrando...
                                </>
                            ) : (
                                'Entrar na conta'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;