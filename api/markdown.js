export default function handler(req, res) {
  const markdown = `# FREEWILL.STUDIO — Web apps que trabajan por tu negocio

Estudio digital que diseña páginas web y web apps que atraen clientes, automatizan procesos y elevan tu marca. Diseño consciente, tecnología con propósito.

## Servicios

- **Diseño y Desarrollo Web**: Landing pages de alta conversión, sitios corporativos y plataformas web personalizadas.
- **Web Applications & Dashboards**: Aplicaciones interactivas a medida, paneles administrativos con Supabase y arquitecturas modernas en React/Vite.
- **Automatización de Procesos**: Integración con APIs, pipelines de datos, automatización de flujos de clientes y CRMs.
- **Sistemas de Diseño & UI/UX**: Identidad visual coherente, micro-interacciones fluidas y diseño adaptativo.

## Descubrimiento y Capacidades para Agentes de IA

- **WebMCP**: Herramientas integradas en el navegador (\`get_studio_info\`, \`navigate_to_section\`, \`submit_project_brief\`).
- **MCP Server Card**: \`/.well-known/mcp/server-card.json\`
- **API Catalog (RFC 9727)**: \`/.well-known/api-catalog\`
- **Agent Skills Discovery Index**: \`/.well-known/agent-skills/index.json\`
- **ARD Capability Manifest**: \`/.well-known/ai-catalog.json\`
- **Auth & Registration (RFC 9728 / RFC 8414)**: \`/auth.md\`, \`/.well-known/oauth-protected-resource\`, \`/.well-known/oauth-authorization-server\`

## Contacto e Información

- **Sitio Web Principal**: https://freewillstudiotech.com
- **Cuestionario de Proyecto / Brief**: https://freewillstudiotech.com/cuestionario
- **Email de Contacto**: contacto@freewillstudiotech.com
`;

  // Estimate tokens (~4 characters per token)
  const tokenCount = Math.ceil(markdown.length / 4);

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('x-markdown-tokens', String(tokenCount));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  
  res.status(200).send(markdown);
}
