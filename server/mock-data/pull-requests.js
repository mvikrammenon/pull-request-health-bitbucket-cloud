export const mockPRData = {
  pullRequests: [
    {
      id: "PR-123",
      title: "feat: Add new ButtonComponent with variants and animations",
      description: `This PR introduces a new reusable ButtonComponent with the following features:
- Primary, secondary, and outline variants
- Loading state with spinner animation
- Disabled state styling
- Ripple effect on click
- Proper accessibility attributes
- Comprehensive test coverage

Please review the implementation and let me know if any changes are needed.`,
      author: {
        email: "sarah.chen@company.com",
        name: "Sarah Chen"
      },
      createdAt: "2024-03-10T09:15:00Z",
      approvedAt: "2024-03-10T16:45:00Z",
      status: "MERGED",
      comments: [
        {
          id: "comment-1",
          content: "Great implementation! A few suggestions:\n1. Consider adding a tertiary variant\n2. The ripple effect animation duration might be a bit too long\n3. Could we add hover state transitions?",
          author: {
            email: "alex.kumar@company.com",
            name: "Alex Kumar"
          },
          createdAt: "2024-03-10T10:30:00Z"
        },
        {
          id: "comment-2",
          content: "The accessibility implementation looks solid. One minor suggestion: let's add aria-pressed for toggle buttons. Also, could you add some examples in the documentation for form submission use cases?",
          author: {
            email: "maria.garcia@company.com",
            name: "Maria Garcia"
          },
          createdAt: "2024-03-10T11:15:00Z"
        },
        {
          id: "comment-3",
          content: "Changes look good now. The hover transitions are much smoother and I like the updated ripple effect timing.",
          author: {
            email: "alex.kumar@company.com",
            name: "Alex Kumar"
          },
          createdAt: "2024-03-10T15:20:00Z"
        },
        {
          id: "comment-4",
          content: "Thanks for adding the aria-pressed attribute and the form examples. LGTM! 👍",
          author: {
            email: "maria.garcia@company.com",
            name: "Maria Garcia"
          },
          createdAt: "2024-03-10T16:30:00Z"
        },
        {
          id: "comment-5",
          content: "Thank you both for the thorough review! I've addressed all the feedback. Ready for final review.",
          author: {
            email: "sarah.chen@company.com",
            name: "Sarah Chen"
          },
          createdAt: "2024-03-10T16:40:00Z"
        }
      ]
    }
  ],
  developers: [
    {
      email: "sarah.chen@company.com",
      name: "Sarah Chen"
    },
    {
      email: "alex.kumar@company.com",
      name: "Alex Kumar"
    },
    {
      email: "maria.garcia@company.com",
      name: "Maria Garcia"
    }
  ]
}