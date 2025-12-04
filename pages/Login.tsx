import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client'; // Importar o cliente Supabase

interface LoginProps {
  currentTheme: 'Claro' | 'Escuro';
}

export const Login: React.FC<LoginProps> = ({ currentTheme }) => {
  const isDark = currentTheme === 'Escuro';

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center p-4 bg-gray-100 dark:bg-black overflow-hidden transition-colors duration-300">
      
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#0000FF 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        
        {/* MAIN CARD */}
        <div className="bg-white dark:bg-[#1A1A1A] border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,255,1)] p-8 md:p-10 relative overflow-hidden transition-all duration-300">
            
            {/* Header / Brand */}
            <div className="mb-6 border-b-4 border-primary pb-4">
                <h1 className="text-black dark:text-white text-3xl font-black uppercase tracking-tighter leading-none mb-1">
                    Acesso Restrito
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    Rino Score System v2.0
                </p>
            </div>

            <Auth
                supabaseClient={supabase}
                providers={[]} // Não usar provedores de terceiros a menos que especificado
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: 'hsl(235 100% 60%)', // Cor primária do seu tema
                                brandAccent: 'hsl(235 100% 40%)', // Cor de destaque
                                defaultButtonBackground: 'black',
                                defaultButtonBackgroundHover: 'hsl(235 100% 60%)',
                                defaultButtonBorder: 'black',
                                inputBackground: 'white',
                                inputBorder: 'rgb(209 213 219)', // gray-300
                                inputBorderHover: 'hsl(235 100% 60%)', // primary
                                inputBorderFocus: 'hsl(235 100% 60%)', // primary
                                inputLabelText: 'rgb(107 114 128)', // gray-500
                                inputText: 'black',
                            },
                            fontSizes: {
                                baseButtonText: '0.75rem', // text-xs
                                baseInput: '0.875rem', // text-sm
                                baseLabel: '0.625rem', // text-[10px]
                            },
                            borderWidths: {
                                inputBorderWidth: '4px',
                            },
                            radii: {
                                borderRadiusButton: '0',
                                buttonBorderRadius: '0',
                                inputBorderRadius: '0',
                            },
                        },
                        dark: {
                            colors: {
                                brand: 'hsl(235 100% 60%)',
                                brandAccent: 'hsl(235 100% 40%)',
                                defaultButtonBackground: 'white',
                                defaultButtonBackgroundHover: 'hsl(235 100% 60%)',
                                defaultButtonBorder: 'white',
                                inputBackground: 'black',
                                inputBorder: 'rgb(55 65 81)', // gray-700
                                inputBorderHover: 'hsl(235 100% 60%)', // primary
                                inputBorderFocus: 'hsl(235 100% 60%)', // primary
                                inputLabelText: 'rgb(156 163 175)', // gray-400
                                inputText: 'white',
                            },
                        },
                    },
                }}
                theme={isDark ? 'dark' : 'light'} // Aplicar o tema dinamicamente
                localization={{
                    variables: {
                        sign_in: {
                            email_label: 'Email',
                            password_label: 'Senha',
                            email_input_placeholder: 'Seu email',
                            password_input_placeholder: 'Sua senha',
                            button_label: 'Entrar',
                            social_provider_text: 'Entrar com {{provider}}',
                            link_text: 'Já tem uma conta? Entrar',
                        },
                        sign_up: {
                            email_label: 'Email',
                            password_label: 'Criar Senha',
                            email_input_placeholder: 'Seu email',
                            password_input_placeholder: 'Sua senha',
                            button_label: 'Cadastrar',
                            social_provider_text: 'Cadastrar com {{provider}}',
                            link_text: 'Não tem uma conta? Cadastrar',
                        },
                        forgotten_password: {
                            email_label: 'Email',
                            email_input_placeholder: 'Seu email',
                            button_label: 'Enviar instruções de recuperação',
                            link_text: 'Esqueceu sua senha?',
                        },
                        update_password: {
                            password_label: 'Nova Senha',
                            password_input_placeholder: 'Sua nova senha',
                            button_label: 'Atualizar Senha',
                        },
                    },
                }}
            />
        </div>
      </div>
    </div>
  );
};