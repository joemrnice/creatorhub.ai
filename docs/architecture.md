# CreatorHub Full-Stack Architecture Documentation

## Overview
CreatorHub is a multi-tenant creator-commerce SaaS platform allowing creators to publish and sell digital products, courses, memberships, and services.

## Monorepo Architecture
- `apps/web`: Next.js 14 frontend application with Tailwind CSS, Recharts, Lucide, and React Hook Form.
- `apps/api`: Node.js / Fastify backend API with Prisma ORM, Supabase Auth integration, and Payment Provider abstraction.
- `packages/types`: Shared TypeScript interfaces for Workspace, Products, Orders, Customers, and AI endpoints.
- `packages/validation`: Zod schemas for order calculation, checkout, and product creation.
- `packages/ui`: Shared design tokens and UI component primitives.
- `prisma`: Multi-tenant PostgreSQL database schema (`schema.prisma`).

## Security & Multitenancy
1. **Workspace Isolation**: All resource queries (`Product`, `Order`, `Customer`, `Course`) enforce explicit `workspaceId` checks.
2. **Server-Side Order Totals**: Order subtotals, coupon discounts, taxes, and final totals are computed strictly on the backend.
3. **Private File Delivery**: Paid product files are stored privately in Supabase Storage. Authorized buyers receive time-limited, signed access URLs (`/api/v1/downloads/:fileId`).
4. **Payment Webhook Idempotency**: `/api/v1/webhooks/payments` verifies HMAC signatures and prevents duplicate order processing.
