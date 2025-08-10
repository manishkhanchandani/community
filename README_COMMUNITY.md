# Community Management App

A React application built with Material-UI and Context API using useReducer for managing communities with full CRUD operations.

## Features

- **Create Communities**: Add new communities with title, description, and creator information
- **Read Communities**: View all communities in a responsive grid layout
- **Update Communities**: Edit existing community information
- **Delete Communities**: Remove communities with confirmation dialog
- **Admin Controls**: Toggle approval status and active status
- **Search & Filter**: Search communities by title, description, or creator. Filter by approval and active status
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **React 19** with TypeScript
- **Material-UI (MUI) v7** for components and theming
- **Context API with useReducer** for state management
- **React Router DOM** for navigation
- **Moment.js** for date formatting
- **UUID** for unique ID generation

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Application Structure

```
src/
├── components/           # Reusable UI components
│   ├── CommunityForm.tsx    # Form for creating/editing communities
│   └── CommunityList.tsx    # Grid display of communities
├── context/             # State management
│   └── CommunityContext.tsx # Context provider with useReducer
├── data/               # Sample data
│   └── sampleData.ts       # Initial community data
├── pages/              # Page components
│   └── CommunitiesPage.tsx # Main communities page
├── theme/              # Material-UI theme
│   └── theme.ts            # Custom theme configuration
├── types/              # TypeScript type definitions
│   └── Community.ts        # Community interfaces and types
└── App.tsx             # Main app component with routing
```

## Community Data Structure

Each community contains the following fields:

- `id`: Unique identifier (string)
- `title`: Community name (string)
- `description`: Community description (string)
- `createdBy`: Creator's name (string)
- `createdAt`: Creation date (Date)
- `updatedAt`: Last update date (Date)
- `approvedByAdmin`: Admin approval status (boolean)
- `isActive`: Active status (boolean)

## Features in Detail

### CRUD Operations

1. **Create**: Click "Create Community" button or the floating action button
2. **Read**: Communities are displayed in a responsive grid with all information
3. **Update**: Click the edit icon on any community card
4. **Delete**: Click the delete icon and confirm in the dialog

### Admin Features

- **Approval Toggle**: Click the approval icon to approve/disapprove communities
- **Active Status**: Use the activate/deactivate button to control community visibility

### Search and Filtering

- **Search**: Use the search bar to find communities by title, description, or creator
- **Filter Chips**: Quick filter by All, Approved, Pending, Active, or Inactive status

### Responsive Design

The application adapts to different screen sizes:

- **Desktop**: 3 columns grid layout
- **Tablet**: 2 columns grid layout
- **Mobile**: Single column layout

## State Management

The application uses React Context API with useReducer for state management:

- **CommunityProvider**: Wraps the entire application
- **useCommunity Hook**: Provides access to state and actions
- **Reducer Actions**: ADD_COMMUNITY, UPDATE_COMMUNITY, DELETE_COMMUNITY, TOGGLE_APPROVAL, TOGGLE_ACTIVE

## Styling

Material-UI provides:

- Consistent design system
- Responsive components
- Custom theme with branded colors
- Dark/light mode support (configurable)

## Sample Data

The application comes with 5 sample communities to demonstrate functionality:

- Be Vegan (Approved, Active)
- Green Living (Approved, Active)
- Local Farmers Market (Pending, Active)
- Book Reading Club (Approved, Inactive)
- Tech Innovators (Pending, Active)

## Development

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App (not recommended)

## Future Enhancements

- Persistence with localStorage or backend API
- User authentication and authorization
- Community tasks/activities management
- Image upload for communities
- Comments and ratings system
- Email notifications for admin actions
