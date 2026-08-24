/**
 * WebMCP (Web Model Context Protocol) Integration
 * Exposes browser-level AI tools for agents browsing FREEWILL.STUDIO
 * Specs: https://webmachinelearning.github.io/webmcp/
 */

export const siteTools = [
  {
    name: 'get_studio_info',
    description: 'Retrieve information about FREEWILL.STUDIO services, tech stack, and value proposition.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          enum: ['services', 'benefits', 'pricing', 'tech_stack', 'all'],
          description: 'Specific topic to retrieve information about (defaults to all)'
        }
      }
    },
    execute: async ({ topic = 'all' } = {}) => {
      const data = {
        name: 'FREEWILL.STUDIO',
        tagline: 'Web apps que trabajan por tu negocio. Diseño consciente, tecnología con propósito.',
        services: [
          'Desarrollo de Web Apps personalizadas (React, Vite, Node, Supabase)',
          'Landing pages de alta conversión optimizadas para ventas',
          'Automatización de procesos empresariales y flujos de trabajo',
          'Sistemas de diseño UI/UX y branding consciente'
        ],
        benefits: [
          'Rendimiento ultra-rápido y optimización SEO integral',
          'Infraestructura lista para agentes de IA (WebMCP, ARD, MCP)',
          'Enfoque en ROI y conversión medible',
          'Soporte directo y arquitectura escalable'
        ],
        contact: {
          website: 'https://freewillstudiotech.com',
          briefUrl: 'https://freewillstudiotech.com/cuestionario',
          email: 'contacto@freewillstudiotech.com'
        }
      };

      if (topic === 'services') return { services: data.services };
      if (topic === 'benefits') return { benefits: data.benefits };
      if (topic === 'tech_stack') return { tech_stack: ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'Supabase', 'Vercel'] };
      return data;
    }
  },
  {
    name: 'navigate_to_section',
    description: 'Scroll smoothly to a section on the FREEWILL.STUDIO page or navigate to a route.',
    inputSchema: {
      type: 'object',
      required: ['target'],
      properties: {
        target: {
          type: 'string',
          enum: ['hero', 'beneficios', 'servicios', 'proyectos', 'proceso', 'testimonios', 'faq', 'contacto', 'cuestionario'],
          description: 'The section ID or route to navigate to'
        }
      }
    },
    execute: async ({ target }) => {
      if (target === 'cuestionario') {
        window.location.href = '/cuestionario';
        return { success: true, message: 'Navigating to project brief questionnaire.' };
      }
      const element = document.getElementById(target) || (target === 'hero' ? document.querySelector('header') : null);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return { success: true, message: `Scrolled to section #${target}` };
      }
      return { success: false, message: `Section #${target} not found.` };
    }
  },
  {
    name: 'get_faq',
    description: 'Get answers to frequently asked questions about FREEWILL.STUDIO.',
    inputSchema: {
      type: 'object',
      properties: {}
    },
    execute: async () => {
      return [
        {
          q: '¿Qué tipo de proyectos desarrollan?',
          a: 'Desarrollamos web apps a medida, portales para clientes, dashboards administrativos, landing pages de alta conversión y automatizaciones de procesos.'
        },
        {
          q: '¿Cuánto tiempo toma un proyecto típico?',
          a: 'Landing pages de 1 a 2 semanas. Web apps y sistemas a la medida de 3 a 6 semanas dependiendo del alcance.'
        },
        {
          q: '¿Cómo inicio un proyecto?',
          a: 'Completando el cuestionario en https://freewillstudiotech.com/cuestionario o enviando un mensaje directo por WhatsApp/Email.'
        }
      ];
    }
  },
  {
    name: 'submit_project_brief',
    description: 'Submit preliminary information for a new project brief to FREEWILL.STUDIO.',
    inputSchema: {
      type: 'object',
      required: ['name', 'email', 'project_type'],
      properties: {
        name: { type: 'string', description: 'Client or contact full name' },
        email: { type: 'string', description: 'Contact email address' },
        project_type: {
          type: 'string',
          enum: ['landing_page', 'web_app', 'ecommerce', 'automation', 'other'],
          description: 'Type of project requested'
        },
        budget: { type: 'string', description: 'Estimated budget' },
        details: { type: 'string', description: 'Project overview and specific requirements' }
      }
    },
    execute: async (params) => {
      return {
        success: true,
        message: 'Brief information received. To complete full submission, visit https://freewillstudiotech.com/cuestionario',
        data: params
      };
    }
  }
];

export function initWebMCP() {
  if (typeof window === 'undefined') return;

  const register = () => {
    try {
      const modelContext = navigator.modelContext || window.modelContext;
      if (modelContext) {
        if (typeof modelContext.provideContext === 'function') {
          modelContext.provideContext({ tools: siteTools });
        }
        if (typeof modelContext.registerTool === 'function') {
          siteTools.forEach((tool) => {
            try {
              modelContext.registerTool(tool);
            } catch {
              // ignore duplicate registration
            }
          });
        }
      }
    } catch (e) {
      console.warn('[WebMCP] ModelContext registration note:', e);
    }
  };

  // Run immediately and on DOM load/modelContext availability
  register();
  if (document.readyState !== 'complete') {
    window.addEventListener('load', register, { once: true });
  }
}
