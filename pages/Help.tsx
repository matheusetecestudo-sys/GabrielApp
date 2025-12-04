
import React, { useState } from 'react';

const HelpSection: React.FC<{ id: string; title: string; icon: string; children: React.ReactNode }> = ({ id, title, icon, children }) => (
    <div id={id} className="scroll-mt-24 mb-12 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-4">
            <div className="size-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center border-2 border-primary shadow-[4px_4px_0px_0px_#0000FF]">
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
            <h2 className="text-2xl font-black uppercase text-black dark:text-white tracking-tight relative">
                {title}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary"></span>
            </h2>
        </div>
        <div className="bg-white dark:bg-[#111] border-l-4 border-black dark:border-white p-6 shadow-sm">
            <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed flex flex-col gap-4 font-medium">
                {children}
            </div>
        </div>
    </div>
);

export const Help: React.FC = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const links = [
        { id: 'intro', label: 'Conceito & Sincronização', icon: 'sync' },
        { id: 'dashboard', label: 'Dashboard & KPIs', icon: 'dashboard' },
        { id: 'orders', label: 'Gestão de Pedidos', icon: 'shopping_cart' },
        { id: 'products', label: 'Produtos & Receitas', icon: 'inventory_2' },
        { id: 'materials', label: 'Controle de Insumos', icon: 'forest' },
        { id: 'calculator', label: 'Calculadora de Custos', icon: 'calculate' },
        { id: 'config', label: 'Configurações & Backup', icon: 'settings_applications' },
    ];

    return (
        <div className="w-full h-full pb-12 flex flex-col xl:flex-row gap-8 relative">
            
            {/* STICKY SIDEBAR NAVIGATION */}
            <aside className="xl:w-80 shrink-0">
                <div className="sticky top-4 bg-white dark:bg-[#1A1A1A] border-4 border-black dark:border-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
                    <div className="mb-6 border-b-4 border-black dark:border-white pb-4">
                        <h1 className="text-3xl font-black uppercase leading-none text-black dark:text-white">Manual<br/>Técnico</h1>
                        <p className="text-[10px] font-bold uppercase text-primary mt-2 tracking-widest">Rino Score System v2.0</p>
                    </div>
                    
                    <nav className="flex flex-col gap-2">
                        {links.map(link => (
                            <button
                                key={link.id}
                                onClick={() => scrollTo(link.id)}
                                className={`
                                    text-left px-4 py-3 font-bold uppercase text-xs tracking-wider flex items-center gap-3 transition-all border-2
                                    ${activeSection === link.id 
                                        ? 'bg-primary text-white border-black dark:border-white shadow-[4px_4px_0px_0px_black] dark:shadow-[4px_4px_0px_0px_white] translate-x-[-2px] translate-y-[-2px]' 
                                        : 'bg-transparent text-gray-500 hover:text-black dark:hover:text-white border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                    }
                                `}
                            >
                                <span className="material-symbols-outlined text-lg">{link.icon}</span>
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 uppercase">
                            <span className="material-symbols-outlined text-sm">verified_user</span>
                            Doc. Confidencial
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 max-w-4xl">
                
                {/* 1. INTRO & SYNC */}
                <HelpSection id="intro" title="Conceito de Sincronização" icon="sync">
                    <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-primary p-4 mb-4">
                        <p className="font-bold uppercase text-primary mb-2">Lógica "Just-in-Time"</p>
                        <p>O sistema foi desenhado para eliminar burocracia. Não existe um botão manual de "Produzir". O fluxo é totalmente automático e financeiro.</p>
                    </div>
                    <ul className="list-disc pl-4 space-y-2 marker:text-primary">
                        <li>
                            <strong>Venda (Novo Pedido):</strong> Ao criar um pedido, o sistema <span className="underline decoration-primary decoration-2">reserva</span> o estoque do Produto Acabado.
                        </li>
                        <li>
                            <strong>Conclusão (O Gatilho):</strong> Quando você marca um pedido como <span className="bg-[#00FF00] text-black px-1 font-bold text-xs">CONCLUÍDO</span>, o sistema entende que o produto foi entregue. Nesse exato momento:
                            <ol className="list-decimal pl-6 mt-2 text-sm font-mono text-gray-500 space-y-1">
                                <li>Baixa as Matérias-Primas do estoque (baseado na receita do produto).</li>
                                <li>Registra o Custo Real no financeiro.</li>
                                <li>Consolida o Lucro Líquido.</li>
                            </ol>
                        </li>
                        <li>
                            <strong>Estorno (Segurança):</strong> Se você excluir um pedido não finalizado, os produtos reservados voltam para o estoque. Se mudar de "Concluído" para "Pendente", as matérias-primas são estornadas.
                        </li>
                    </ul>
                </HelpSection>

                {/* 2. DASHBOARD */}
                <HelpSection id="dashboard" title="Dashboard & KPIs" icon="dashboard">
                    <p>O painel de controle oferece uma visão panorâmica ("God View") da sua operação.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="border-2 border-gray-200 dark:border-gray-800 p-3">
                            <strong className="block text-primary uppercase text-xs mb-1">Time Travel (Filtro Temporal)</strong>
                            Seletor no topo que permite viajar no tempo. Ao selecionar "7 DIAS", todos os gráficos recalculam para mostrar apenas a realidade daquela semana.
                        </div>
                        <div className="border-2 border-gray-200 dark:border-gray-800 p-3">
                            <strong className="block text-primary uppercase text-xs mb-1">Batalha de Canais</strong>
                            Gráficos radiais que comparam a performance de vendas Online vs Loja Física. Útil para saber onde focar o marketing.
                        </div>
                    </div>
                </HelpSection>

                {/* 3. ORDERS */}
                <HelpSection id="orders" title="Gestão de Pedidos (PDV)" icon="shopping_cart">
                    <p>Interface unificada que funciona como um sistema de Ponto de Venda.</p>
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>Carrinho de Compras:</strong> Um pedido pode conter múltiplos produtos diferentes. O sistema calcula o subtotal automaticamente.</li>
                        <li><strong>Status Pendente (Amarelo):</strong> Pedido aceito, mas ainda não entregue. O faturamento entra como "Previsto".</li>
                        <li><strong>Status Atrasado (Vermelho):</strong> Automático. Se a data de hoje ultrapassar o prazo de entrega, o card entra em estado de alerta.</li>
                    </ul>
                </HelpSection>

                {/* 4. PRODUCTS */}
                <HelpSection id="products" title="Produtos & Receitas" icon="inventory_2">
                    <p>Aqui você cadastra o "DNA" dos seus móveis. O mais importante é a <strong>Composição (Receita)</strong>.</p>
                    <div className="bg-gray-100 dark:bg-black p-4 border border-gray-300 dark:border-gray-700 font-mono text-xs mt-2">
                        EXEMPLO DE RECEITA (MESA RÚSTICA):<br/>
                        - 2.0m² de Madeira Carvalho<br/>
                        - 0.5L de Verniz<br/>
                        - 12un de Parafusos
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                        * É com base nessa lista que o sistema sabe o que descontar do estoque de materiais quando você vende uma mesa.
                    </p>
                </HelpSection>

                {/* 5. MATERIALS */}
                <HelpSection id="materials" title="Controle de Insumos" icon="forest">
                    <p>Gestão de matéria-prima bruta. O sistema monitora dois níveis críticos:</p>
                    <ul className="list-disc pl-4 space-y-2 mt-2">
                        <li>
                            <span className="text-yellow-600 font-bold">ALERTA (BAIXO):</span> Quando o estoque está próximo do mínimo.
                        </li>
                        <li>
                            <span className="text-red-600 font-bold">CRÍTICO:</span> Quando o estoque cai abaixo de 50% do mínimo. Exige reposição imediata para não parar a produção.
                        </li>
                    </ul>
                </HelpSection>

                {/* 6. CALCULATOR */}
                <HelpSection id="calculator" title="Calculadora de Custos" icon="calculate">
                    <p>Uma ferramenta isolada (Sandbox) para orçamentos rápidos. Os dados inseridos aqui <strong>não afetam</strong> o banco de dados oficial.</p>
                    <p className="mt-2">Use para simular preços de projetos personalizados antes de cadastrá-los oficialmente como produtos.</p>
                </HelpSection>

                 {/* 7. CONFIG */}
                 <HelpSection id="config" title="Configurações & Backup" icon="settings_applications">
                    <p>Área administrativa vital para a segurança dos seus dados.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-black text-white p-4 relative overflow-hidden group">
                            <span className="absolute -right-4 -top-4 text-gray-800 text-6xl material-symbols-outlined opacity-50 group-hover:rotate-12 transition-transform">download</span>
                            <strong className="block text-primary uppercase text-sm mb-2">Backup (JSON)</strong>
                            <p className="text-xs opacity-80">Gera um arquivo contendo TODO o seu banco de dados. Salve isso em um pendrive ou na nuvem semanalmente.</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-500 p-4 relative">
                            <strong className="block text-red-600 uppercase text-sm mb-2">Reset de Fábrica</strong>
                            <p className="text-xs text-red-500">Apaga tudo e restaura os dados de exemplo. Exige confirmação por palavra-chave para evitar acidentes.</p>
                        </div>
                    </div>
                </HelpSection>

            </div>
        </div>
    );
};
