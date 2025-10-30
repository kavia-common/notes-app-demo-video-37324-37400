export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  color?: string;
};

export const sampleNotes: Note[] = [
  {
    id: 'n1',
    title: 'Project kickoff',
    content:
      'Define scope, stakeholders, and milestones. Share first draft of roadmap.',
    tags: ['work', 'planning'],
    color: '#DBEAFE',
  },
  {
    id: 'n2',
    title: 'Ideas for Q4',
    content:
      '• Improve onboarding flow\n• Add tags to notes\n• Keyboard shortcuts',
    tags: ['ideas'],
    color: '#FEF3C7',
  },
  {
    id: 'n3',
    title: 'Shopping list',
    content: 'Coffee beans, oat milk, granola, berries.',
    tags: ['personal'],
    color: '#F3E8FF',
  },
];
