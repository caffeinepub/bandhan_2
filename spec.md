# Bandhan - Phase 1: Core Platform

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Landing/home page with hero section, features overview, call-to-action
- User registration and login (via authorization component)
- Profile creation and editing: name, age, gender, religion, caste, mother tongue, education, profession, location (city/state), about me, photo upload
- Browse/search matches: grid of profile cards with basic filters (age range, religion, location)
- View individual profile detail page
- My profile page (view and edit own profile)
- Basic dashboard after login

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: user profile data model (name, age, gender, religion, caste, education, profession, city, state, aboutMe, photoUrl), CRUD operations for profiles, search/filter profiles by age/religion/location
2. Frontend: landing page, auth flow, profile creation form, match browsing grid with filters, profile detail view, my profile page
3. Components: authorization for login/register, blob-storage for profile photo uploads
