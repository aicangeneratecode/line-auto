'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    id: '01',
    question: 'Сколько времени занимает окраска автомобиля?',
    answer:
      'В зависимости от объёма работ и состояния кузова, процесс может занять от нескольких дней до недели.',
  },
  {
    id: '02',
    question: 'Какие материалы вы используете для покраски?',
    answer:
      'Мы используем только высококачественные материалы и сертифицированные краски, чтобы обеспечить долговечность и стойкость покрытия.',
  },
  {
    id: '03',
    question: 'Могу ли я выбрать любой цвет для окраски?',
    answer:
      'Да, мы предлагаем широкий выбор оттенков и можем подобрать индивидуальный цвет по вашему запросу.',
  },
  {
    id: '04',
    question: 'Предоставляете ли вы гарантию на выполненные работы?',
    answer:
      'Да, мы даем гарантию на наши малярные работы, что подтверждает высокое качество наших услуг.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" data-section="faq" className="pt-16 md:py-24 lg:py-12 text-white relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="inline-block bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border border-accent/30">
            Ответы на вопросы
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Часто задаваемые вопросы</h2>
          <p className="text-lg text-gray-300">Всё, что вы хотели узнать</p>
        </div>

        <div className="mt-12 divide-y divide-white/10">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="py-4">
              <button onClick={() => toggle(index)} className="w-full flex items-start gap-4 text-left group">
                <span className="text-sm font-mono text-accent/60 flex-shrink-0 mt-1">{faq.id}</span>
                <span className="flex-1 text-sm md:text-lg font-medium text-white group-hover:text-accent transition-colors">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 mt-1 text-accent">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="pl-12 text-xs md:text-base text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}