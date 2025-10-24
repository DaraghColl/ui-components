import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfileStateSelector } from './ProfileStateSelector';

// Mock motion/react to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    button: ({ children, onClick, whileHover, whileTap, transition, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    div: ({ children, initial, animate, exit, transition, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ProfileStateSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('opens dropdown when profile button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProfileStateSelector />);

    const profileButton = screen.getByRole('button', { name: 'Profile State Selector' });

    await user.click(profileButton);

    expect(screen.getByText('available')).toBeInTheDocument();
    expect(screen.getByText('busy')).toBeInTheDocument();
    expect(screen.getByText('do not disturb')).toBeInTheDocument();
    expect(screen.getByText('be right back')).toBeInTheDocument();
    expect(screen.getByText('away')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <ProfileStateSelector />
        <div data-testid="outside-element">Outside element</div>
      </div>
    );

    const profileButton = screen.getByRole('button');

    await user.click(profileButton);
    expect(screen.getByText('busy')).toBeInTheDocument();

    const outsideElement = screen.getByTestId('outside-element');
    await user.click(outsideElement);

    await waitFor(() => {
      expect(screen.queryByText('busy')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<ProfileStateSelector />);

    const profileButton = screen.getByRole('button');

    await user.click(profileButton);
    expect(screen.getByText('busy')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('busy')).not.toBeInTheDocument();
    });
  });

  it('renders all status options in dropdown', async () => {
    const user = userEvent.setup();
    render(<ProfileStateSelector />);

    const profileButton = screen.getByRole('button');
    await user.click(profileButton);

    const expectedStatuses = ['available', 'busy', 'do not disturb', 'be right back', 'away'];

    expectedStatuses.forEach(status => {
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });

  it('highlights currently active status in dropdown', async () => {
    const user = userEvent.setup();
    render(<ProfileStateSelector />);

    const profileButton = screen.getByRole('button');

    await user.click(profileButton);

    const availableOption = screen.getByText('available');
    expect(availableOption).toHaveClass('bg-neutral-200', 'dark:bg-neutral-950');

    const busyOption = screen.getByText('busy');
    expect(busyOption).not.toHaveClass('bg-neutral-200', 'dark:bg-neutral-950');
  });

  it('updates highlighted status after selection', async () => {
    const user = userEvent.setup();
    render(<ProfileStateSelector />);

    const profileButton = screen.getByRole('button');

    await user.click(profileButton);

    await user.click(screen.getByText('busy'));

    await user.click(profileButton);

    const busyOption = screen.getByText('busy');
    expect(busyOption).toHaveClass('bg-neutral-200', 'dark:bg-neutral-950');

    const availableOption = screen.getByText('available');
    expect(availableOption).not.toHaveClass('bg-neutral-200', 'dark:bg-neutral-950');
  });

  it('does not close dropdown when clicking inside dropdown area', async () => {
    const user = userEvent.setup();
    render(<ProfileStateSelector />);

    const profileButton = screen.getByRole('button');

    await user.click(profileButton);
    expect(screen.getByText('busy')).toBeInTheDocument();

    const dropdownContainer = screen.getByText('busy').closest('div');
    if (dropdownContainer) {
      fireEvent.mouseDown(dropdownContainer);
    }

    expect(screen.getByText('busy')).toBeInTheDocument();
  });
});
