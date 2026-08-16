# Plan: Developmental Deficit-Based Recommendations

Enhance the marketplace recommendations to prioritize products based on a child's specific developmental deficits rather than just broad diagnostic categories (OVZ). Verify the matching logic for the "Kidalki" interactive wall.

## Proposed Changes

### 1. Engine Refinement (`src/lib/universum-data.ts`)
- Enhance `generatePrescription` or add a specific recommendation helper that:
    - Identifies all products that address at least one of the child's "critical" or "below average" deficits with an impact > 60%.
    - Sorts recommendations by the magnitude of the potential impact on the child's specific deficits.
    - Ensures age-appropriateness.

### 2. Recommendations UI (`src/routes/marketplace.recommendations.tsx`)
- Refactor the page to show "Personalized Recommendations" based on the child's profile (using the default demo child "Dima K.").
- Group products by the specific *deficit* they address (e.g., "Solutions for Visual-Motor Coordination") rather than just diagnostic labels.
- Retain the OVZ-based grouping as a secondary "Explore by Category" section.

### 3. Verification
- Verify "Kidalki Interactive Wall" against Dima's RAS-related motor deficits.
- **Current Data Check**:
    - Dima K. (RAS) has `hand_eye_coordination` deficit (Score: 19%).
    - Kidalki Wall has `hand_eye_coordination` impact (85%).
    - **Result**: They match perfectly for a motor deficit typical in RAS profiles.
- I will add a UI indicator in the "Recommendations" page to show *why* a product is recommended (e.g., "Addresses critical deficit: Visual-Motor Coordination").

## Technical Details
- Use the existing `CHILDREN[0]` (Dima K.) as the active profile for recommendations.
- Filter `PRODUCTS` by checking `product.metrics` against `child.deficits`.
- Update `ProductCard` to optionally display the matched deficit badge.
