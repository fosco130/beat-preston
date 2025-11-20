# Contributing to Beat Preston

Thank you for your interest in contributing to Beat Preston! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## 📜 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/beat-preston.git
cd beat-preston
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:5173 to see your changes.

## 🔄 Development Workflow

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-sound-effects`)
- `fix/` - Bug fixes (e.g., `fix/score-calculation`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/clean-up-components`)
- `test/` - Adding tests (e.g., `test/add-unit-tests`)

### Making Changes

1. **Make your changes** in your feature branch
2. **Test thoroughly** - Test all three game tasks
3. **Build locally** - Ensure production build works
4. **Check for errors** - No console warnings/errors
5. **Update documentation** - If needed

### Testing Your Changes

```bash
# Development mode
npm run dev

# Production build test
npm run build
npm run preview

# Check for TypeScript errors
npx tsc --noEmit
```

## 💅 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Properly type all variables, functions, and props
- Avoid `any` type unless absolutely necessary
- Use interfaces for component props

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

// Avoid
const Button = (props: any) => { }
```

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use meaningful component and variable names

```typescript
// Good
export const TaskResultsCard: React.FC<TaskResultsProps> = ({ score, maxScore }) => {
  // Component logic
}

// File naming: PascalCase for components
// TaskResultsCard.tsx
```

### Styling (Emotion)

- Use the existing theme constants (`colors`, `spacing`, `typography`)
- Keep styled components co-located with their components
- Use semantic naming for styled components

```typescript
import styled from '@emotion/styled';
import { colors, spacing, typography } from '../styles/theme';

const StyledButton = styled.button`
  background: ${colors.yellow};
  padding: ${spacing.md};
  font-size: ${typography.sizes.body};
`;
```

### File Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── game/            # Game-specific components
│   └── layout/          # Layout components
├── pages/               # Page components (routes)
├── styles/              # Theme and global styles
├── types/               # TypeScript type definitions
├── data/                # Static game data
└── utils/               # Utility functions (if needed)
```

## 📝 Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(task1): add sound effects to lead response game"

# Bug fix
git commit -m "fix(scoring): correct time saved calculation in task 3"

# Documentation
git commit -m "docs: update deployment guide with Vercel instructions"

# Multiple changes
git commit -m "feat(ui): improve button accessibility

- Add ARIA labels to all interactive buttons
- Increase touch target size for mobile
- Add keyboard navigation support"
```

## 🔀 Pull Request Process

### 1. Update Your Branch

```bash
# Fetch latest changes from main
git fetch origin
git rebase origin/main
```

### 2. Push Your Changes

```bash
git push origin feature/your-feature-name
```

### 3. Create Pull Request

1. Go to the repository on GitHub
2. Click "Pull Requests" → "New Pull Request"
3. Select your branch
4. Fill out the PR template
5. Request review

### PR Checklist

Before submitting, ensure:

- [ ] Code builds successfully (`npm run build`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No console errors or warnings
- [ ] All game tasks tested and working
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention
- [ ] PR description is clear and complete

### Review Process

1. **Automated checks** will run (build, lint)
2. **Code review** by maintainers
3. **Requested changes** addressed
4. **Approval** and merge

## 🧪 Testing

### Manual Testing Checklist

Test the complete game flow:

- [ ] **Welcome Page**
  - Form validation works
  - Navigation to first task

- [ ] **Task 1: Lead Response**
  - Timer counts down correctly
  - All 10 leads display
  - Score calculation accurate
  - Preston progress animation

- [ ] **Task 2: Hot Sellers**
  - Can select exactly 10 rows
  - Submit button enables/disables correctly
  - Score calculation accurate

- [ ] **Task 3: Admin Tasks**
  - All 10 tasks display
  - Time saved calculation correct
  - Category selection works

- [ ] **Final Score Page**
  - Total score correct (sum of all tasks)
  - Time savings display correctly
  - Leaderboard shows player position

- [ ] **Responsive Design**
  - Works on desktop (1920x1080)
  - Works on iPad landscape (2048x1536)
  - Touch targets adequate (44px minimum)

### Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Safari iOS (iPad)

## 🎨 Design Guidelines

### Colors

Use theme colors consistently:

```typescript
colors.darkGreen   // Primary: #1E4D42
colors.yellow      // Accent: #FDB92F
colors.brightGreen // Success: #4CAF50
colors.pink        // Highlight: #FFB3BA
```

### Typography

```typescript
typography.sizes.h1       // Large headlines
typography.sizes.h2       // Section titles
typography.sizes.body     // Body text
typography.weights.bold   // Emphasis
```

### Spacing

```typescript
spacing.xs   // 4px
spacing.sm   // 8px
spacing.md   // 16px
spacing.lg   // 24px
spacing.xl   // 32px
spacing.xxl  // 48px
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description** - Clear summary of the issue
2. **Steps to Reproduce** - Detailed steps
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Screenshots** - If applicable
6. **Environment** - Browser, OS, device
7. **Console Errors** - Any error messages

### Bug Report Template

```markdown
**Description:**
Score calculation is incorrect on Task 3

**Steps to Reproduce:**
1. Complete Task 3
2. Select all correct answers
3. View final score

**Expected:** 1000 points
**Actual:** 900 points

**Browser:** Chrome 120
**Device:** iPad Air (2022)
**Console Errors:** None
```

## 💡 Feature Requests

When suggesting features:

1. **Use Case** - Why is this needed?
2. **Proposed Solution** - How should it work?
3. **Alternatives** - Other approaches considered
4. **Impact** - Who benefits? How much effort?

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Emotion Documentation](https://emotion.sh/docs/introduction)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## ❓ Questions?

- Open a GitHub Issue for public discussion
- Check existing issues/PRs first
- Be specific and provide context

---

Thank you for contributing to Beat Preston! 🎮🚀

Every contribution, no matter how small, helps make the game better for estate agents everywhere.
