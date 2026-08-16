# Plan: UNIVERSUM Marketplace Completion

Complete the B2B2C marketplace prototype for correctional equipment and digital solutions.

## User Persona Implementation

### 1. Parent Dashboard (`/parent/dashboard`)
- **Child Profile**: Display "Dima K." metrics from `universum-data.ts`.
- **Digital Prescription**: Automatically generated list of recommended products based on the child's specific deficits.
- **Progress Tracking**: Visualization of developmental progress over time across the 5 spheres.

### 2. Vendor Portal (`/vendor/add-product`)
- **Product Listing Form**: Multi-step form for manufacturers to upload equipment details.
- **API Mapping**: Interface for vendors to specify which metrics their device impacts and the scientific basis (DOI).
- **Validation Tracker**: Status indicator for the "UNIVERSUM Validation" process.

### 3. Regional/B2B View (`/analytics`)
- **Regional Dashboard**: Aggregated analytics of developmental deficits in a specific region.
- **Procurement Planner**: Recommendations for large-scale equipment purchases based on regional data.

## Technical Details
- **Architecture**: TanStack Router routes, Shadcn UI components.
- **Data**: Using existing `universum-data.ts` mock store, extending it for child history and regional aggregation.
- **Visuals**: Consistent with the 5-sphere color coding (Purple, Orange, Pink, Green, Cyan) and medical-pedagogical aesthetic.

## Implementation Steps

1. **Extend Data Model**: Add regional analytics mock data and child progress history to `src/lib/universum-data.ts`.
2. **Dashboard Component**: Create `/parent/dashboard` with the Digital Prescription engine.
3. **Vendor Form**: Create `/vendor/add-product` with zod validation and impact mapping UI.
4. **Analytics Route**: Create `/analytics` for regional decision-makers.
5. **Navigation**: Update `SiteHeader` to ensure all new routes are accessible.
