# FREEWILL.STUDIO auth.md

Agent Authentication & Registration Protocol for FREEWILL.STUDIO (`freewillstudiotech.com`).

## Overview

This service supports automated agent registration and OAuth 2.0 discovery per RFC 9728 and RFC 8414.

## Discovery Endpoints

- **OAuth Protected Resource Metadata**: `/.well-known/oauth-protected-resource`
- **OAuth Authorization Server**: `/.well-known/oauth-authorization-server`
- **OpenID Configuration**: `/.well-known/openid-configuration`
- **MCP Server Card**: `/.well-known/mcp/server-card.json`
- **Agent Skills Index**: `/.well-known/agent-skills/index.json`
- **AI Catalog / ARD**: `/.well-known/ai-catalog.json`

## Supported Registration Flows

### 1. Anonymous Agent Provisioning
- Endpoint: `https://freewillstudiotech.com/oauth/register`
- Type: `anonymous`
- Credentials: `bearer_token`
- Claim URI: `https://freewillstudiotech.com/oauth/claim`

### 2. Identity Assertion / Verified Email
- Assertion Types: `urn:ietf:params:oauth:token-type:id-jag`, `verified_email`
- Credentials: `bearer_token`
- Claim URI: `https://freewillstudiotech.com/oauth/claim`
- Revocation URI: `https://freewillstudiotech.com/oauth/revoke`

## Scopes Supported

- `read`: Read public studio information, portfolio, and services.
- `write`: Submit inquiry forms and briefs.
- `brief:create`: Create a project discovery brief.
- `project:read`: Access public project case studies.
