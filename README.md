# ShopSage-Ecommerce
B2C ecommerce project


# Team Collaboration Workflow

This project follows a structured development workflow using GitHub Issues, feature branches, and Pull Requests. Every team member must follow the steps below to ensure clean collaboration and proper project management.

---

## Workflow Overview

Each task follows this process:

**Issue → Branch → Development → Commit → Push → Pull Request → Review → Merge**

No development should begin without an assigned issue.

---

## Step 1: Check Assigned Issue

Before starting any task:

1. Open the project repository on GitHub.
2. Navigate to the **Issues** section.
3. Open the issue assigned to you.
4. Carefully read:

   * Task objective
   * Requirements
   * Acceptance criteria
   * Branch naming convention

Make sure you fully understand the task before beginning development.

---

## Step 2: Sync Local Repository

Before creating your branch:

1. Switch to the `develop` branch.
2. Pull the latest changes from the remote repository.

This ensures your local repository contains the latest project updates and avoids unnecessary merge conflicts.

---

## Step 3: Create a Feature Branch

Create a new branch from the latest `develop` branch.

### Branch Naming Convention

Use meaningful branch names:

* `feature/auth-registration`
* `feature/product-management`
* `feature/cart-ui`
* `bugfix/login-validation`
* `hotfix/payment-error`

Each issue must have its own branch.

---

## Step 4: Start Development

Work only on the task assigned in the issue.

Examples of work may include:

* Backend API development
* Frontend UI implementation
* Database schema updates
* Bug fixes
* Documentation updates
* Unit testing

### Important Rules

* Never work directly on `main`.
* Never work directly on `develop`.
* Only work on your assigned branch.

---

## Step 5: Commit Changes

After completing a logical unit of work:

1. Review your changes.
2. Stage the files.
3. Create a meaningful commit message.

### Commit Message Format

Use:

**Type: Short Description #IssueNumber**

Examples:

* `feat: implement user registration API #12`
* `fix: resolve login validation bug #15`
* `docs: update authentication documentation #20`

### Commit Types

Use the following prefixes:

* `feat` → New feature
* `fix` → Bug fix
* `refactor` → Code improvement
* `docs` → Documentation
* `test` → Testing
* `style` → Formatting/UI styling

---

## Step 6: Push Your Branch

Push your feature branch to GitHub after committing your work.

Make sure your latest changes are available on the remote repository before creating a Pull Request.

---

## Step 7: Create Pull Request

After pushing your branch:

1. Open the repository on GitHub.
2. Navigate to **Pull Requests**.
3. Click **New Pull Request**.
4. Select:

### Base Branch

`feature/`

### Compare Branch

Your feature branch.

---

## Step 8: Write Pull Request Description

Every Pull Request must include:

### Summary

Explain what was implemented.

### Changes Made

List major changes.

### Related Issue

Reference the issue number.

### Testing

Mention how the feature was tested.

Example:

* Tested API using Postman
* Verified UI responsiveness
* Tested validation scenarios

---

## Step 9: Request Code Review

Assign the Pull Request to:

* Team Leader
* Assigned Reviewer

The reviewer will verify:

* Code quality
* Naming conventions
* Error handling
* Security practices
* Project architecture consistency

---

## Step 10: Address Review Comments

If review changes are requested:

1. Make the required changes locally.
2. Commit the changes.
3. Push the updated branch.

The Pull Request will update automatically.

---

## Step 11: Merge Pull Request

After approval:

The Pull Request will be merged into the `feature` branch.

Only approved Pull Requests can be merged.

---

## Step 12: Delete Feature Branch

After successful merge:

Delete the feature branch from GitHub and your local repository to keep the repository clean.

---

## Step 13: Start Next Task

Repeat the workflow for the next assigned issue.

---

# Branch Protection Rules

The following branches are protected:

* `main`
* `develop`

### Direct pushes are not allowed.

All changes must come through Pull Requests.

---

# Team Development Rules

Every team member must follow these rules:

✅ One issue = One branch
✅ One branch = One Pull Request
✅ Every task must start with an issue
✅ Every commit must be meaningful
✅ Every Pull Request must reference an issue
✅ Pull latest `develop` before starting work
✅ Resolve merge conflicts before requesting review
✅ Never commit sensitive files such as `.env`
✅ Keep Pull Requests focused on a single task
✅ Ask for review before merging

---

# Success Formula

**Plan → Assign → Build → Review → Merge → Repeat**

Following this workflow ensures clean collaboration, scalable development, and successful project delivery.
