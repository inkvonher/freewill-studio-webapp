# FREEWILL.STUDIO auth.md

Agent Authentication & Registration Protocol for FREEWILL.STUDIO (`freewillstudiotech.com`).

## Overview

This service supports automated AI agent registration and OAuth 2.0 discovery per RFC 9728, RFC 8414, and the Auth.md specification.

## Discovery Documents

- **OAuth Protected Resource Metadata (RFC 9728)**: `https://freewillstudiotech.com/.well-known/oauth-protected-resource`
- **OAuth Authorization Server Metadata (RFC 8414)**: `https://freewillstudiotech.com/.well-known/oauth-authorization-server`
- **OpenID Configuration**: `https://freewillstudiotech.com/.well-known/openid-configuration`
- **MCP Server Card (SEP-1649)**: `https://freewillstudiotech.com/.well-known/mcp/server-card.json`
- **Agent Skills Discovery Index**: `https://freewillstudiotech.com/.well-known/agent-skills/index.json`
- **ARD Capability Manifest**: `https://freewillstudiotech.com/.well-known/ai-catalog.json`

## agent_auth Metadata

```json
{
  "agent_auth": {
    "skill": "https://freewillstudiotech.com/.well-known/agent-skills/auth/SKILL.md",
    "register_uri": "https://freewillstudiotech.com/oauth/register",
    "identity_types_supported": [
      "anonymous",
      "identity_assertion"
    ],
    "anonymous": {
      "credential_types_supported": [
        "bearer_token"
      ],
      "claim_uri": "https://freewillstudiotech.com/oauth/claim"
    },
    "identity_assertion": {
      "assertion_types_supported": [
        "urn:ietf:params:oauth:token-type:id-jag",
        "verified_email"
      ],
      "credential_types_supported": [
        "bearer_token"
      ],
      "claim_uri": "https://freewillstudiotech.com/oauth/claim",
      "revocation_uri": "https://freewillstudiotech.com/oauth/revoke",
      "events_supported": [
        "revocation"
      ]
    }
  }
}
```

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
