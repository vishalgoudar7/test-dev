# Clear Cart After Logout - Implementation Tasks

## Tasks to Complete:

- [x] Update `src/context/UserAuthContext.js` to clear cart on logout
  - [x] Add `localStorage.removeItem('cart')` to logout function
  - [x] Dispatch cart update event to notify other components

- [x] Update `src/components/Navbar.js` to clear cart on logout
  - [x] Add cart clearing in handleLogout function
  - [x] Update cart count immediately after logout
  - [x] Dispatch cart update events

## Testing:
- [ ] Test logout functionality
- [ ] Verify cart is cleared after logout
- [ ] Verify cart count updates correctly in navbar
- [ ] Ensure no cart data persists after logout

## Status: Implementation Complete - Ready for Testing

## Implementation Summary:
✅ **UserAuthContext.js**: Added cart clearing functionality to the main logout function
✅ **Navbar.js**: Added cart clearing and immediate cart count update to handleLogout function
✅ Both files now dispatch storage and cartUpdated events to notify other components
✅ Cart will be cleared from localStorage when user logs out from either location
