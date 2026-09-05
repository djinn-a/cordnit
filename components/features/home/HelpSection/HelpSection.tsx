import React from 'react';
import { Shield, Cloud, Cpu, Database, Network, PenTool, ArrowRight } from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'Cybersecurity',
    desc: <>Resilient architectures that protect critical<br className="sm:hidden" /><span className="hidden sm:inline"> </span>assets and ensure compliance.</>,
    icon: Shield,
  },
  {
    num: '02',
    title: 'Cloud & Infrastructure',
    desc: <>Scalable foundations optimized for<br className="sm:hidden" /><span className="hidden sm:inline"> </span>performance and cost efficiency.</>,
    icon: Cloud,
  },
  {
    num: '03',
    title: 'AI & Automation',
    desc: <>Intelligent systems that streamline<br className="sm:hidden" /><span className="hidden sm:inline"> </span>operations and drive decision-making.</>,
    icon: Cpu,
  },
  {
    num: '04',
    title: 'Data & Integration',
    desc: <>Unified data ecosystems that break down<br className="sm:hidden" /><span className="hidden sm:inline"> </span>silos and enable insights.</>,
    icon: Database,
  },
  {
    num: '05',
    title: 'Salesforce',
    desc: <>Optimized CRM architectures that align with<br className="sm:hidden" /><span className="hidden sm:inline"> </span>your complex workflows.</>,
    icon: Network,
  },
  {
    num: '06',
    title: 'Application Engineering',
    desc: <>Bespoke software solutions built with<br className="sm:hidden" /><span className="hidden sm:inline"> </span>precision and architectural integrity.</>,
    icon: PenTool, // Using PenTool as a stand-in for the drafting compass
  },
];

export default function HelpSection() {
  return (
    <section className="w-full pt-8 pb-4 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 sm:mb-16 gap-3 sm:gap-8">
        <h2 className="text-[1.5rem] sm:text-4xl md:text-5xl font-bold sm:font-extrabold text-black md:w-1/2 leading-tight">
          Where we can help
        </h2>
        <p className="text-gray-500 sm:text-gray-600 md:w-1/2 text-body-medium sm:text-lg leading-[1.6] sm:leading-relaxed max-w-[95%]">
          Structured methodologies applied to complex<br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>technological challenges. We architect solutions<br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>designed for scalability, security, and operational<br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>endurance.
        </p>
      </div>

      {/* Grid Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          
          // Determine borders based on position in the 3x2 grid for Desktop
          const isLgBottomBorder = index < 3;
          const isLgRightBorder = (index + 1) % 3 !== 0;
          
          return (
            <React.Fragment key={service.num}>
              {/* Desktop View */}
              <div 
                className={`
                  hidden sm:block
                  relative p-8 lg:p-12
                  border-brand-border
                  border-b-2
                  ${isLgRightBorder ? 'lg:border-r-2' : ''}
                  ${!isLgBottomBorder ? 'lg:border-b-0' : ''}
                  hover:bg-[#f0f7fa] transition-colors
                `}
              >
                <div className="flex justify-between items-start mb-12">
                  <Icon className="w-8 h-8 text-gray-700 stroke-[1.5]" />
                  <span className="text-xs font-semibold text-gray-900">{service.num}</span>
                </div>
                
                <h3 className="text-xl font-bold text-brand-primary mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Mobile View */}
              <div className="sm:hidden flex items-start py-[1.125rem] border-b border-gray-200 group cursor-pointer hover:bg-gray-50 transition-colors">
                {/* Number */}
                <div className="text-brand-primary font-medium mr-3 mt-[2px] text-body-medium">
                  {service.num}
                </div>
                
                {/* Content */}
                <div className="flex-1 pr-3">
                  <h3 className="text-[1rem] font-medium text-black mb-1 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-body-medium leading-[1.6]">
                    {service.desc}
                  </p>
                </div>
                
                {/* Arrow */}
                <div className="mt-1.5 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-brand-primary" />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
