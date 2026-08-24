---
name: agent-auth
description: Instructions for AI agents to authenticate and register with FREEWILL.STUDIO APIs and services.
---

# Agent Authentication

Instructions and specifications for AI agents interacting with protected endpoints on `freewillstudiotech.com`.

## Discovery Endpoints

- **OAuth Protected Resource Metadata**: `/.well-known/oauth-protected-resource`
- **OAuth Authorization Server**: `/.well-known/oauth-authorization-server`
- **Auth.md Guide**: `/auth.md`

## Authentication Methods

- **Bearer Token**: Transmitted via standard `Authorization: Bearer <token>` HTTP header.
- **Anonymous Provisioning**: Agents may request anonymous client credentials at `https://freewillstudiotech.com/oauth/register`.
- **Identity Assertion**: Supported via `id-jag` and verified email assertions.
